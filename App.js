import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import Constants from 'expo-constants';
import * as Efs from 'expo-file-system';
import * as Rnfs from 'react-native-fs';
import RnBlobUtil from 'react-native-blob-util';

const dummyData = 'x'.repeat(5000000);

const outputPath = `${Efs.cacheDirectory}efs-1mb.txt`;
console.log('outputPath', outputPath);

async function writeEfs() {
  const start = Date.now();
  await Efs.writeAsStringAsync(
    outputPath,
    dummyData,
    { encoding: 'utf8' }
  );
  console.log('writeEfs, ms: ', Date.now() - start);
}

async function writeRnfs() {
  const start = Date.now();
  await Rnfs.writeFile(
    outputPath,
    dummyData,
    { encoding: 'utf8' }
  );
  console.log('writeRnfs, ms: ', Date.now() - start);
}

async function writeRnBlobUtil() {
  const start = Date.now();
  await RnBlobUtil.fs.writeFile(
    outputPath.replace('file://', ''),
    dummyData,
    'utf8',
  );
  console.log('writeRnBlobUtil, ms: ', Date.now() - start);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title='Write data with Expo File System' onPress={writeEfs} />
      <Button title='Write data with React Native FS' onPress={writeRnfs} />
      <Button title='Write data with React Native Blob Util' onPress={writeRnBlobUtil} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
