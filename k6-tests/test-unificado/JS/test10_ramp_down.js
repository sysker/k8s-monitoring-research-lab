/**
 * TEST 10 — Rampa descendente gradual
 *
 * Objetivo: decrementar la carga de forma lineal desde un máximo
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  stages: [
    { duration: '5s',   target: 80  },  // arranque rápido al máximo
    { duration: '120s', target: 0   },  // descenso gradual
  ],
};

export default function () {
  http.post(URL, JSON.stringify({ n: 25 }), PARAMS);
  sleep(1);
}
