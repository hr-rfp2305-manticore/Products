import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    {duration: '2m', target: 100}, // below normal load
    {duration: '5m', target: 100},
    {duration: '2m', target: 200}, // normal load
    {duration: '5m', target: 200},
    {duration: '2m', target: 300}, // breaking point
    {duration: '5m', target: 300},
    {duration: '2m', target: 400}, // beyong breaking point
    {duration: '5m', target: 400},
    {duration: '10m', target: 0}, // scale down recovery stage
  ]
}

const baseUrl = 'http://localhost:3000';

export default () => {
  const productId = 123
  http.batch([
    ['GET', `${baseUrl}/products`],
    ['GET', `${baseUrl}/products/${productId}`],
    ['GET', `${baseUrl}/products/${productId}/styles`],
  ]);

  sleep(1);
};