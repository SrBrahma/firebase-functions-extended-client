// https://stackoverflow.com/a/38340374/10247962
function removeEmpty(obj: Record<string, any>) {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
    else if (obj[key] !== undefined) newObj[key] = obj[key];
  });
  return newObj;
}

/** Converts your data and options with type safety to the CF data object to be sent.
 *
 * Will use the Short format options (d, cV, l instead of data, clientVersion, language).
 */
function extData(data?: unknown, options?: ExtOptions): ExtDataProps {
  return ({
    d: data,
    cV: options?.clientVersion,
    l: options?.language,
  });
}

type Options = {
  // Only and common prop between firebase and rn-firebase. Using this so we don't need any type import here
  /** The timeout property allows you to control how long the application will wait
   * for the cloud function to respond in milliseconds. */
  timeout?: number;
};

/** https://stackoverflow.com/a/49889856/10247962 */
type EnsurePromise<T> = T extends PromiseLike<any> ? T : Promise<T>;


/** Returns a callable, so you can call your firebase-functions-extended functions. */
export function getExtCallableFunction<F extends Record<string, {_argsType: any; _rtnType: any}>>({ functions, appVersion, language }: {
  /** Your firebase.functions(). */
  functions: any;
  appVersion?: string;
  language?: string;
  // We do this type cond inversed as undefined extends any but not the contrary
}): (<K extends keyof F>(functionId: K, options?: Options) => (undefined extends F[K]['_argsType']
  ? ((data?: F[K]['_argsType']) => EnsurePromise<F[K]['_rtnType']>)
  : ((data: F[K]['_argsType']) => EnsurePromise<F[K]['_rtnType']>))) {
  return (functionId, options): any => { // any in rtn to ignore it.
    return async function (data: any) {
      const fun = functions.httpsCallable(functionId, { ...options });
      if (typeof data === 'object' && data !== null)
        data = removeEmpty(data);
      return (await fun(extData(data, { clientVersion: appVersion, language: language }))).data;
    };
  };
}

export type ExtOptions = {
  language?: string;
  /** Defaults to `'0.0.0'`, so you can have a SemVar check in your function, even if your
   * client hasn't set a clientVersion before. */
  clientVersion?: string;
};
export type ExtOptionsShort = {
  /** Same as `language` property, shorter version. */
  l?: string;
  /** Same as `clientVersion` property, shorter version. */
  cV?: string;
};
export type ExtDataProps = {
  data?: unknown;
  /** Same as `data` property, shorter version. */
  d?: unknown;
} & ExtOptions & ExtOptionsShort;