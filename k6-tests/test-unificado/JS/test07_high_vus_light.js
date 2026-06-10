/**
 * TEST 07 — Alta concurrencia, trabajo ligero
 *
 * Objetivo: muchos VUs simultáneos con peticiones baratas
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  vus: 150,
  duration: '60s',
};

export default function () {
  http.post(URL, JSON.stringify({ n: 5 }), PARAMS);
  sleep(0.2);
}
