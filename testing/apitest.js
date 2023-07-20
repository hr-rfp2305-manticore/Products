import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  insecureSkipTLSverify: true,
  noConnectionReuse: false,
  vus: 1,
  duration: '10s'
};

export default function () {
  const baseUrl = 'https://localhost:3000'

  // Test for endpoint /products
  const allProductsUrl = `${baseUrl}/products`
  const allProductsResponse = http.get(allProductsUrl);
  check(allProductsResponse, {
    'is status 200 for allProducts': (r) => r.status === 200,
    'has data for allProducts': (r) => r.json().length > 0,
  });

  // Test for endpoint /products/:id
  const productId = 123 // Replace with the desired product ID for testing
  const productByIdUrl = `${baseUrl}/products/${productId}`
  const productByIdResponse = http.get(productByIdUrl);
  check(productByIdResponse, {
    'is status 200 for productById': (r) => r.status === 200,
    'has data for productById': (r) => r.json() !== null,
  });

  // Test for endpoint /styles/:id
  const styleByIdUrl = `${baseUrl}/products/${productId}/styles`
  const styleByIdResponse = http.get(styleByIdUrl);
  check(styleByIdResponse, {
    'is status 200 for styleById': (r) => r.status === 200,
    'has data for styleById': (r) => r.json() !== null,
  });

  sleep(1);
}


