const generationMethod = 'method2'; // 'method1' or 'method2';

if (!globalThis.print) {
  var print = console.log;
}

let seqId = 0;
function sequentialId() {
  return ++seqId;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomBool(chanceOfTrue = 0.5) {
  return Math.random() < chanceOfTrue ? 'true' : 'false';
}

function randomStr(len) {
  const chars = 'ABCDEFG HIJKLMNOP QRSTUVWX YZabcdefghijklmno pqrstuvwxyz0 123456789 ';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const randomEnums = [];
for (let i = 0; i < 255; i++) {
  randomEnums.push(randomStr(15));
}

function randomEnum() {
  return randomEnums[Math.floor(Math.random() * randomEnums.length)];
}

let dummyData = '';

if (generationMethod === 'method1') {
  print('generating dummyData via method 1 (large products object)...');
  dummyData = '{';
  // 1 iteration generates roughly 1000 bytes, so 1000 iterations is ~1 MB
  for (let i = 1; i <= 10000; i++) {
    dummyData += `
    "product_${i}": {
      "id": ${i},
      "title": "perfume Oil",
      "description": "Mega Discount, Impression of Lorem ipsum dolor sit amet",
      "price": ${randomInt(100)},
      "discountPercentage": 8.4,
      "rating": ${randomInt(10)},
      "stock": ${randomInt(100)},
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
} else {
  const targetMbSize = 8;
  print(`generating dummyData via method 2 (nested task lists) to reach ~${targetMbSize} MB...`);
  dummyData = `
  {
    "state": {
      "data": {
        "availableTaskListsStatuses": null,
        "availableTaskLists": [
          {
            "enabled": ${randomBool()},
            "taskListsId": ${randomInt(10)},
            "taskListsStatusMapping": [],
            "taskSubLists": [],
            "taskName": "${randomStr(30)}"
          },
          {
            "enabled": ${randomBool()},
            "taskListsId": ${randomInt(10)},
            "taskListsStatusMapping": [
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              }
            ],
            "taskSubLists": [
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              }
            ],
            "taskName": "${randomStr(30)}"
          },
          {
            "enabled": ${randomBool()},
            "taskListsId": ${randomInt(10)},
            "taskListsStatusMapping": [
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              }
            ],
            "taskSubLists": [
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              }
            ],
            "taskName": "${randomStr(30)}"
          },
          {
            "enabled": ${randomBool()},
            "taskListsId": ${randomInt(10)},
            "taskListsStatusMapping": [
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              }
            ],
            "taskSubLists": [
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              }
            ],
            "taskName": "${randomStr(30)}"
          },
          {
            "enabled": ${randomBool()},
            "taskListsId": ${randomInt(10)},
            "taskListsStatusMapping": [
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              }
            ],
            "taskSubLists": [
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              }
            ],
            "taskName": "${randomStr(30)}"
          },
          {
            "enabled": ${randomBool()},
            "taskListsId": ${randomInt(10)},
            "taskListsStatusMapping": [
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              }
            ],
            "taskSubLists": [
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              }
            ],
            "taskName": "${randomStr(30)}"
          },
          {
            "enabled": ${randomBool()},
            "taskListsId": ${randomInt(10)},
            "taskListsStatusMapping": [
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              }
            ],
            "taskSubLists": [
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              }
            ],
            "taskName": "${randomStr(30)}"
          },
          {
            "enabled": ${randomBool()},
            "taskListsId": ${randomInt(10)},
            "taskListsStatusMapping": [
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              },
              {
                "taskListsStatus": {
                  "taskListsStatusID": ${randomInt(1000)},
                  "statusName": "${randomEnum()}"
                }
              }
            ],
            "taskSubLists": [
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              }
            ],
            "taskName": "${randomStr(30)}"
          },
          {
            "enabled": ${randomBool()},
            "taskListsId": ${randomInt(10)},
            "taskListsStatusMapping": [],
            "taskSubLists": [
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              },
              {
                "enabled": ${randomBool()},
                "taskSubListsId": ${randomInt(10000)},
                "subListsName": "${randomEnum()}"
              }
            ],
            "taskName": "${randomStr(30)}"
          }
        ],
        "availableTaskSources": [
          {
            "taskSourceId": ${sequentialId()},
            "sourceName": "${randomEnum()}"
          },
          {
            "taskSourceId": ${sequentialId()},
            "sourceName": "${randomEnum()}"
          },
          {
            "taskSourceId": ${sequentialId()},
            "sourceName": "${randomEnum()}"
          },
          {
            "taskSourceId": ${sequentialId()},
            "sourceName": "${randomEnum()}"
          },
          {
            "taskSourceId": ${sequentialId()},
            "sourceName": "${randomEnum()}"
          }
        ],
        "availableTaskStatuses": [
          {
            "taskStatusId": ${sequentialId()},
            "statusName": "${randomEnum()}"
          },
          {
            "taskStatusId": ${sequentialId()},
            "statusName": "${randomEnum()}"
          },
          {
            "taskStatusId": ${sequentialId()},
            "statusName": "${randomEnum()}"
          },
          {
            "taskStatusId": ${sequentialId()},
            "statusName": "${randomEnum()}"
          }
        ]
      },
      "dataUpdatedAt": ${Date.now()}
    },
    "queryKey": [
      "task_lists"
    ],
    "queryHash": "[\\"task_lists\\"]",
    "cacheTime": 0
  }
  `;

  print('dummyData template size, in kB:', Math.round(JSON.stringify(JSON.parse(dummyData)).length / 1024));

  // Expand array to reach the desired size
  let parsedData = JSON.parse(dummyData);
  const originalTasksLength = parsedData.state.data.availableTaskLists.length;
  const targetSize = targetMbSize * 1024 * 1024;
  let currentSize = dummyData.length;

  while (currentSize < targetSize) {
    const randomIndex = Math.floor(Math.random() * originalTasksLength);
    const randomItem = parsedData.state.data.availableTaskLists[randomIndex];
    const clonedItem = JSON.parse(JSON.stringify(randomItem));
    clonedItem.taskListsId = Math.round(Math.random() * 10000);

    for (let i = 0; i < targetMbSize; i++) {
      parsedData.state.data.availableTaskLists.push(clonedItem);
    }
    
    dummyData = JSON.stringify(parsedData);
    currentSize = dummyData.length;
  }
}

print('dummyData size in kB:', Math.round(JSON.stringify(JSON.parse(dummyData)).length / 1024));

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


