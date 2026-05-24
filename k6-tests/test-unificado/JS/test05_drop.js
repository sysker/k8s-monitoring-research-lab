/**
 * TEST 05 — Carga alta sostenida seguida de bajón brusco
 *
 * Objetivo: mantener alta carga durante 60 s y luego cortar de golpe
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  stages: [
    { duration: '5s',  target: 80 },  // subida rápida
    { duration: '60s', target: 80 },  // meseta
    { duration: '2s',  target: 0  },  // corte brusco
    { duration: '30s', target: 0  },  // observación post-corte
  ],
};

export default function () {
  http.post(URL, JSON.stringify({ n: 28 }), PARAMS);
  sleep(0.5);
}
