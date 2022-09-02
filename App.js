import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import Constants from 'expo-constants';
import * as Exfs from 'expo-file-system';
import * as Rnfs from 'react-native-fs';
import RnBlobUtil from 'react-native-blob-util';
import {FileSystem as Rnfa} from 'react-native-file-access';

let dummyData = '{';
// 1 iteration generates roughly 1000 bytes, so 1000 iterations is ~1 MB
for (let i = 1; i <= 10000; i++) {
  dummyData += `
  "product_${i}": {
    "id": ${i},
    "title": "perfume Oil",
    "description": "Mega Discount, Impression of Lorem ipsum dolor sit amet",
    "price": ${Math.round(Math.random() * 100)},
    "discountPercentage": 8.4,
    "rating": ${Math.round(Math.random() * 10)},
    "stock": ${Math.round(Math.random() * 100)},
    "brand": "Impression of Acqua Di Gio",
    "category": "fragrances",
    "thumbnail": "https://dummyjson.com/image/i/products/${i}/thumbnail.jpg",
    "images": [
      "https://dummyjson.com/image/i/products/11/1.jpg",
      "https://dummyjson.com/image/i/products/11/2.jpg",
      "https://dummyjson.com/image/i/products/11/3.jpg",
      "https://dummyjson.com/image/i/products/11/4.jpg",
      "https://dummyjson.com/image/i/products/11/5.jpg",
      "https://dummyjson.com/image/i/products/11/6.jpg",
      "https://dummyjson.com/image/i/products/11/7.jpg",
      "https://dummyjson.com/image/i/products/11/8.jpg",
      "https://dummyjson.com/image/i/products/11/9.jpg",
      "https://dummyjson.com/image/i/products/11/10.jpg"
    ]
  },`;
}
dummyData += '"end": {}}';

const outputPath = `${Exfs.cacheDirectory}dummy-data.txt`;
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


async function writeExfs() {
  const measurements = [];
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    await Exfs.writeAsStringAsync(
      outputPath,
      dummyData,
      { encoding: 'utf8' }
    );
    measurements.push(Date.now() - start);
    console.log('writeExfs, ms: ', measurements.slice(-1)[0]);
  }
  console.log('writeExfs median', getMedian(measurements));
  console.log('writeExfs avg', getAverage(measurements));
}

async function readExfs() {
  const measurements = [];
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    await Exfs.readAsStringAsync(
      outputPath,
      { encoding: 'utf8' }
    );
    measurements.push(Date.now() - start);
    console.log('readExfs, ms: ', measurements.slice(-1)[0]);
  }
  console.log('readExfs median', getMedian(measurements));
  console.log('readExfs avg', getAverage(measurements));
}

async function readExfsJson() {
  const measurements = [];
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    // Read and parse text as JSON, but discard resulting object
    JSON.parse(await Exfs.readAsStringAsync(
      outputPath,
      { encoding: 'utf8' }
    ));
    measurements.push(Date.now() - start);
    console.log('readExfsJson, ms: ', measurements.slice(-1)[0]);
  }
  console.log('readExfsJson median', getMedian(measurements));
  console.log('readExfsJson avg', getAverage(measurements));
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

async function writeRnfa() {
  const measurements = [];
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    await Rnfa.writeFile(
      outputPath,
      dummyData,
      'utf8'
    );
    measurements.push(Date.now() - start);
    console.log('writeRnfa, ms: ', measurements.slice(-1)[0]);
  }
  console.log('writeRnfa median', getMedian(measurements));
  console.log('writeRnfa avg', getAverage(measurements));
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
      <Button title='Write data with Expo File System' onPress={writeExfs} />
      <Button title='Write data with React Native FS' onPress={writeRnfs} />
      <Button title='Write data with React Native Blob Util' onPress={writeRnBlobUtil} />
      <Button title='Write data with React Native File Access' onPress={writeRnfa} />

      <View style={{ marginTop: 24 }}>
        <Button title='Read data as text with Expo File System' onPress={readExfs} />
        <Button title='Read data as JSON with Expo File System' onPress={readExfsJson} />
      </View>
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
