import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  InsecureSkipTLSVerify: true,
  noConnectionReuse: true,
  scenarios : {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 200,
      maxVUs: 400
    }
  }
};

export default function () {
  const BASE_URL = 'http://localhost:1334'; // make sure this is not production
  const id = (Math.floor(Math.random() * 100000)) + 900000;

  const responses = http.batch([
    ['GET', `${BASE_URL}/products/${id}`, null, { tags: { name: 'Product' } }],
    ['GET', `${BASE_URL}/products/${id}/styles`, null, { tags: { name: 'Styles' } }],
    ['GET', `${BASE_URL}/products/${id}/related`, null, { tags: { name: 'Related' } }],
  ]);

  sleep(0.1);
}



