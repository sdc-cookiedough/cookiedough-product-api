const colors = require('colors');
const path = require('path');
const { readFile, access } = require('fs/promises');
const constants = require('fs').constants;
const { table } = require('table');

// const prompt = require('prompt');
// use prompt later when fleshing out better node app :)

console.log(`\ncomparing two k6 files`.inverse)

const testName = 'styles'

const location = {
  fileOne: `./results/10vu5000i-${testName}.un.json`,
  fileTwo: `./results/10vu5000i-${testName}.op.json`
};

let resultOne, resultTwo;

let compare = (metricName, valueOne, valueTwo) => {
  console.log(metricName.white.bgCyan);
  let metrics = Object.keys(valueOne);
  let data = [['', `${testName} query unoptimized`, `${testName} query optimized`, '']];
  for (let i = 0; i < metrics.length; i++) {
    let metric = metrics[i];
    let performance = valueTwo[metric] - valueOne[metric];
    let performanceString;
    if (performance > 0) {
      performanceString = `${performance.toString()}ms ↑`.red;
    } else {
      performanceString = `${performance.toString()}ms ↓`.green;
    }
    data.push([metric, valueOne[metric], valueTwo[metric], performanceString])
  }
  console.log(table(data));
}

access(path.join(__dirname, location.fileOne), constants.R_OK)
  .then(() => {
    return access(path.join(__dirname, location.fileTwo), constants.R_OK);
  })
  .then(() => {
    let promiseArray = [readFile(path.join(__dirname, location.fileOne)), readFile(path.join(__dirname, location.fileTwo))]
    return Promise.all(promiseArray)
  })
  .then((data) => {
    resultOne = JSON.parse(data[0])
    resultTwo = JSON.parse(data[1])
    let metrics = Object.keys(resultOne.metrics);
    for (let i = 0; i < metrics.length; i++) {
      compare(metrics[i], resultOne.metrics[metrics[i]].values, resultTwo.metrics[metrics[i]].values)
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
