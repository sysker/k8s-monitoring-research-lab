/**
 * TEST 06 — Pico único brusco
 *
 * Objetivo: generar un único pico de carga muy repentino
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  stages: [
    { duration: '20s', target: 0   },  // reposo inicial
    { duration: '5s',  target: 100 },  // subida brusca
    { duration: '15s', target: 100 },  // pico sostenido
    { duration: '5s',  target: 0   },  // bajada brusca
    { duration: '20s', target: 0   },  // reposo final
  ],
};

export default function () {
  http.post(URL, JSON.stringify({ n: 28 }), PARAMS);
  sleep(0.5);
}
