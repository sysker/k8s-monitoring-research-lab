/**
 * TEST 05 — Rampa ascendente gradual
 *
 * Objetivo: incrementar la carga de forma lineal y continua
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  stages: [
    { duration: '120s', target: 80 },
  ],
};

export default function () {
  http.post(URL, JSON.stringify({ n: 25 }), PARAMS);
  sleep(1);
}
