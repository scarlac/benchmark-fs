# Test Setup
iOS Simulator on an M1 Macbook Pro, running macOS 12.4 (21F79).
A 5 MB file is written to disk on every button press.
10 measurements of each library's writeFile()-equivalent function.
1 warm-up write every time the library was switched in case there was any kind of caching going on.

# Results
Benchmark of various React Native filesystem libraries:

```
| library                | milliseconds, median (aka p50) |
|------------------------+--------------------------------|
| expo-file-system       |                           43.5 |
| react-native-fs        |                            217 |
| react-native-blob-util |                             43 |
```

## Other remarks
Android emulator was casually tested as well, where RNFS had 3x worse performance (around 600ms per write), while the other libraries were around the same values as iOS. This would make sense since the emulator generally has a high CPU emulation overhead.

## Conclusion
`react-native-fs` is a mature filesystem library that is well maintained, however their choice to encode everything as base64 in transit between native and JS means it comes with a huge performance hit that (to my knowledge) cannot easily be worked around. The API itself will always encode as base64 despite choosing utf-8.
