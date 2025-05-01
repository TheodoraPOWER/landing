import http from 'k6/http';
import { check, sleep } from 'k6';

// --- Configuration ---
// Adjust BASE_URL to where your application is running
const BASE_URL = 'http://localhost:5173'; 
// Adjust API_ENDPOINT if your contact form submits elsewhere
const API_ENDPOINT = `${BASE_URL}/api/contact`; 

export const options = {
  // Simulate stages of load: ramp up, sustain, ramp down
  stages: [
    { duration: '30s', target: 10 }, // Ramp up to 10 users over 30 seconds
    { duration: '1m', target: 10 },  // Stay at 10 users for 1 minute
    { duration: '10s', target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    // Define performance goals
    'http_req_duration': ['p(95)<500'], // 95% of requests should be below 500ms
    'http_req_failed': ['rate<0.01'],   // Request failure rate should be less than 1%
    'checks': ['rate>0.99'],           // Success rate of custom checks should be > 99%
  },
};

// --- Test Logic (Virtual User code) ---
export default function () {
  // 1. Visit the homepage
  const resHomepage = http.get(BASE_URL);
  check(resHomepage, {
    'Homepage loaded successfully (status 200)': (r) => r.status === 200,
    'Homepage contains expected text': (r) => r.body.includes('<html'), // Basic check
  });

  sleep(1); // Wait for 1 second between actions

  // 2. Simulate submitting the contact form
  const payload = JSON.stringify({
    name: `k6 User ${__VU}-${__ITER}`, // Unique name per user/iteration
    email: `k6user_${__VU}_${__ITER}@example.com`,
    company: 'Load Test Inc.',
    role: 'Tester',
    message: 'This is a k6 load test submission.',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const resApi = http.post(API_ENDPOINT, payload, params);
  check(resApi, {
    'Contact form submitted successfully (status 200/2xx)': (r) => r.status >= 200 && r.status < 300,
    // Add more checks based on your API response if needed
    // 'API response indicates success': (r) => r.json('success') === true, 
  });

  sleep(1); // Wait for 1 second
}

// --- Optional Setup/Teardown ---
export function setup() {
  console.log('Starting k6 load test...');
  // Setup code (e.g., login, get tokens) - not needed for this simple test
}

export function teardown(data) {
  console.log('Finished k6 load test.');
  // Teardown code (e.g., cleanup resources)
} 