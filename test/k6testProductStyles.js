import http from 'k6/http';
import { sleep } from 'k6';

const configuration = {
  vus: 100,
  iterations: 10000,
  duration: '3600s'
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
  let filename = `${configuration.vus}VU_${configuration.iterations}_${today.mm}${today.dd}_${today.hr}${today.min}.json`
  let result = {}
  result[filename] = JSON.stringify(data, null, 4)
  return result
}

export default function () {
  let random = Math.floor(Math.random() * 1000000);
  console.log(`Requesting product ID ${random}`);
  http.get(`http://localhost:1337/products/${random}/styles`);
  sleep(1);
}