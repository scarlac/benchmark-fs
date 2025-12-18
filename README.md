# React Native Filesystem Libraries Comparison

![Screen shot of the benchmarking app](screenshot.jpg)

## Test Setup

A ~5 MB file is written 10 times to disk on every button press.
JavaScriptCore was invoked by running `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc cli-test.js` (note that the version of JSC will depend on the OS version).

## Results

Benchmark of various React Native filesystem libraries:

## iOS Simulator on an Apple M1 Pro, Macbook Pro, running macOS 12.4 (21F79)

```
| library                  | milliseconds, median (aka p50) |
|--------------------------+--------------------------------|
| expo-file-system         |                             28 |
| react-native-fs          |                            228 |
| react-native-blob-util   |                             31 |
| react-native-file-access |                             24 |
```

(lower is better)

## Samsung Galaxy S21 (SG-G991U), Android 12

```
| library                  | milliseconds, median (aka p50) |
|--------------------------+--------------------------------|
| expo-file-system         |                             25 |
| react-native-fs          |                            300 |
| react-native-blob-util   |                             25 |
| react-native-file-access |                             32 |
```

(lower is better)

## Conclusion

`react-native-fs` is a mature filesystem library that is well maintained, however their choice to encode everything as base64 in transit between native and JS means it comes with a huge performance hit that (to my knowledge) cannot easily be worked around. The API itself will always encode as base64 despite choosing utf-8.

# React Native Engine Benchmark: Hermes vs JSC

## Samsung Galaxy S21 (SG-G991U), Android 12

| Engine | Method              | Result |
| ------ | ------------------- | ------ |
| Hermes | readExfs median     | 65.0   |
| Hermes | readExfs avg        | 62.2   |
| JSC    | readExfs median     | 86.0   |
| JSC    | readExfs avg        | 84.4   |
| Hermes | readExfsJson median | 172.0  |
| Hermes | readExfsJson avg    | 176.2  |
| JSC    | readExfsJson median | 122.0  |
| JSC    | readExfsJson avg    | 120.4  |

(lower is better)

## Test Setup

Built using "release" build variant in Android Studio. App was "run", not debugged. Logcat output was observed for the console.log output statements using the filter "ReactNativeJS" in verbose mode.  
To switch between the engines, simply modify `android/gradle.properties`'s `expo.jsEngine=jsc` line to whichever engine you want to test (`hermes` or `jsc`).

`readExfs()` will read data from disk as a string and discard it.  
`readExfsJson()` will read data from disk as a string, run it through `JSON.parse()` and discard it.

## Conclusion

Hermes improves app startup speed (confirmed separately) and these tests show that Hermes also reads raw data from disk a little faster than JSC (26% faster).  
JSC wins out in JSON parsing (30% faster), a very common use case for modern apps.

So, "is Hermes faster"? If you use redux-persist or otherwise read/write JSON data frequently, the answer is likely no. If you don't, you should be fine and Hermes should be an overall win.

# Command Line Test (cli-test.js)

## Test Setup

Example runs:

```
# Hermes 2025-09-01 (https://github.com/facebook/hermes/releases/tag/hermes-2025-09-01-RNv0.82.0-265ef62ff3eb7289d17e366664ac0da82303e101)
$ ~/Developer/hermes_workingdir/build_release/bin/hermes -emit-binary -out cli-test.hbc cli-test.js
$ ~/Developer/hermes_workingdir/build_release/bin/hermes cli-test.hbc

# JavaScriptCore (JSC)
$ /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc cli-test.js

# NodeJS
$ node cli-test.js
```

## Results, M4 Pro

Run on an Apple M4 Pro, 48 GB Unified Memory, Macbook Pro, running macOS 15.6 (24G84)

| Engine            | Method           | Result |
| ----------------- | ---------------- | ------ |
| Hermes 2025-09-01 | parseJson median | 26.0   |
| Hermes 2025-09-01 | parseJson avg    | 28.6   |
| NodeJS v20.19.4   | parseJson median | 9.0    |
| NodeJS v20.19.4   | parseJson avg    | 10.0   |
| JSC               | parseJson median | 6.0    |
| JSC               | parseJson avg    | 7.3    |
| Deno              | parseJson median | 8.0    |
| Deno              | parseJson avg    | 8.8    |

(lower is better)

## Results, M1 Pro

Run on an Apple M1 Pro, 16 GB Unified Memory, Macbook Pro, running macOS 12.5.1 (21G83)

| Engine                                                                      | Method           | Result |
| --------------------------------------------------------------------------- | ---------------- | ------ |
| Hermes v0.12.0                                                              | parseJson median | 50.0   |
| Hermes v0.12.0                                                              | parseJson avg    | 54.5   |
| Hermes hermes-2025-01-13-RNv0.78.0-a942ef374897d85da38e9c8904574f8376555388 | parseJson median | 43.0   |
| Hermes hermes-2025-01-13-RNv0.78.0-a942ef374897d85da38e9c8904574f8376555388 | parseJson avg    | 42.7   |
| JSC                                                                         | parseJson median | 15.0   |
| JSC                                                                         | parseJson avg    | 16.6   |
| NodeJS v16.13.2                                                             | parseJson median | 15.0   |
| NodeJS v16.13.2                                                             | parseJson avg    | 15.4   |
| NodeJS v16.13.2                                                             | parseJson median | 15.0   |
| NodeJS v16.13.2                                                             | parseJson avg    | 15.4   |
| NodeJS v20.11.1                                                             | parseJson median | 13.0   |
| NodeJS v20.11.1                                                             | parseJson avg    | 14.3   |

(lower is better)

### Conclusion

Hermes is ~3x slower than JSC and NodeJS for JSON.parse() on 1M payloads.
