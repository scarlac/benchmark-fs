# Test Setup
A 5 MB file is written 10 times to disk on every button press.

# Results
Benchmark of various React Native filesystem libraries:

## iOS Simulator on an M1 Macbook Pro, running macOS 12.4 (21F79)
```
| library                | milliseconds, median (aka p50) |
|------------------------+--------------------------------|
| expo-file-system       |                           43.5 |
| react-native-fs        |                          217.0 |
| react-native-blob-util |                             43 |
```

## Samsung Galaxy S21 (SG-G991U), Android 12
```
| library                | milliseconds, median (aka p50) |
|------------------------+--------------------------------|
| expo-file-system       |                           47.0 |
| react-native-fs        |                          937.0 |
| react-native-blob-util |                           34.0 |
```

## Conclusion
`react-native-fs` is a mature filesystem library that is well maintained, however their choice to encode everything as base64 in transit between native and JS means it comes with a huge performance hit that (to my knowledge) cannot easily be worked around. The API itself will always encode as base64 despite choosing utf-8.
