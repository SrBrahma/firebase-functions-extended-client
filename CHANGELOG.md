# Changelog

<!-- Template, # for major version, ## for minor and patch

# 1.0.0 (YYYY-MM-DD)
### Added
*
### Changed
*
### Fixed
*
-->

## 5.5.0
* If data is an object, undefined properties are now removed (deep copy non-undefined props). Before, as done automatically by firebase-functions, undefined props were turned to null.

## 5.4.0~1 - 2021-10-05
##### 5.4 to be in same minor version as main package. Nah, bad idea. Ignore this on future versions.
* Added return type to functions.

## 5.1.0 - 2021-08-24
* `getExtCallableFunction` is now generic

## 5.0.1 - 2021-08-14
* Changed tsconfig target to es5

## 5.0.0 - 2021-08-13
* Project release, same major of firebase-functions-extended.
