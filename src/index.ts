


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
}


/** Returns a callable, so you can call your firebase-functions-extended functions. */
export function getExtCallableFunction<F extends Record<string, {_argsType: any}>>({ functions, appVersion, language }: {
  /** Your firebase.functions(). */
  functions: any;
  appVersion?: string;
  language?: string;
  // We do this type cond inversed as undefined extends any but not the contrary
}): (<K extends keyof F>(functionId: K, options?: Options) => (undefined extends F[K]['_argsType']
  ? ((data?: F[K]['_argsType']) => Promise<unknown>)
  : ((data: F[K]['_argsType']) => Promise<unknown>)))
{
  return (functionId, options) => {
    return async function (data: any) {
      const fun = functions.httpsCallable(functionId, { ...options });
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