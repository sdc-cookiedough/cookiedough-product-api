import http from 'k6/http';
import { sleep } from 'k6';

const configuration = {
  vus: 10,
  iterations: 1000,
  duration: '10m'
}

export const options = {
  vus: configuration.vus,
  noConnectionReuse: true,
  iterations: configuration.iterations,
  duration: configuration.duration
};

var today = new Date();
today.dd = String(today.getDate()).padStart(2, '0');
today.mm = String(today.getMonth() + 1).padStart(2, '0');
today.yyyy = String(today.getFullYear());
today.hr = String(today.getHours());
today.min = String(today.getMinutes());

export function handleSummary(data) {
  console.log('STARTING SUMMARY GENERATION FAM');
  let filename = `${configuration.vus}VU_${configuration.iterations}_${today.mm}${today.dd}_${today.hr}${today.min}.json`;
  let result = {};
  result[filename] = JSON.stringify(data, null, 4);
  result.stdout = textSummary(data, { indent: ' ', enableColors: true });
  return result
}

export default function () {
  let random = (Math.floor(Math.random() * 100000)) + 900000; // last 10% of dataset
  console.log(`Requesting product ID ${random}`);
  http.get(`http://localhost:1337/products/${random}`);
  sleep(1);
}