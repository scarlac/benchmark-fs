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

if (!globalThis.print) {
  var print = console.log;
}

function getMedian(values = []) {
  const medianValue = values.length % 2 === 1 ?
    values[Math.ceil(values.length / 2)] :
    (values[Math.floor(values.length / 2)] + values[Math.ceil(values.length / 2)]) / 2;
  return medianValue;
}

function getAverage(values = []) {
  return values.reduce((prev, cur) => prev + cur, 0) / values.length;
}

async function parseJson() {
  const measurements = [];
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    // Read and parse text as JSON, but discard resulting object
    JSON.parse(dummyData);
    measurements.push(Date.now() - start);
    print('parseJson, ms: ', measurements.slice(-1)[0]);
  }
  print('parseJson median', getMedian(measurements));
  print('parseJson avg', getAverage(measurements));
}

parseJson().then(() => {
  print('done');
});


