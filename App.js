import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import Constants from 'expo-constants';
import * as Efs from 'expo-file-system';
import * as Rnfs from 'react-native-fs';
import RnBlobUtil from 'react-native-blob-util';

const dummyData = 'x'.repeat(5000000);

const outputPath = `${Efs.cacheDirectory}dummy-data.txt`;
console.log('outputPath', outputPath);

function getMedian(values = []) {
  const medianValue = values.length % 2 === 1 ?
    values[Math.ceil(values.length / 2)] :
    (values[Math.floor(values.length / 2)] + values[Math.ceil(values.length / 2)]) / 2;
  return medianValue;
}

function getAverage(values = []) {
  return values.reduce((prev, cur) => prev + cur, 0) / values.length;
}


async function writeEfs() {
  const measurements = [];
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    await Efs.writeAsStringAsync(
      outputPath,
      dummyData,
      { encoding: 'utf8' }
    );
    measurements.push(Date.now() - start);
    console.log('writeEfs, ms: ', measurements.slice(-1)[0]);
  }
  console.log('writeEfs median', getMedian(measurements));
  console.log('writeEfs avg', getAverage(measurements));
}

async function writeRnfs() {
  const measurements = [];
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    await Rnfs.writeFile(
      outputPath,
      dummyData,
      { encoding: 'utf8' }
    );
    measurements.push(Date.now() - start);
    console.log('writeRnfs, ms: ', measurements.slice(-1)[0]);
  }
  console.log('writeRnfs median', getMedian(measurements));
  console.log('writeRnfs avg', getAverage(measurements));
}

async function writeRnBlobUtil() {
  const measurements = [];
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    await RnBlobUtil.fs.writeFile(
      outputPath.replace('file://', ''),
      dummyData,
      'utf8',
    );
    measurements.push(Date.now() - start);
    console.log('writeRnBlobUtil, ms: ', measurements.slice(-1)[0]);
  }
  console.log('writeRnBlobUtil median', getMedian(measurements));
  console.log('writeRnBlobUtil avg', getAverage(measurements));
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
