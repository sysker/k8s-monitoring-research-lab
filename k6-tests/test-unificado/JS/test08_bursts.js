/**
 * TEST 08 — Pulsos ultracortos (burst pattern)
 *
 * Objetivo: generar pulsos de carga de 3 s de duración con 3 s de valle
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

// 8 ciclos ON/OFF de 3 s cada uno = 48 s de test
export const options = {
  stages: [
    { duration: '3s', target: 70 }, { duration: '3s', target: 0 },
    { duration: '3s', target: 70 }, { duration: '3s', target: 0 },
    { duration: '3s', target: 70 }, { duration: '3s', target: 0 },
    { duration: '3s', target: 70 }, { duration: '3s', target: 0 },
    { duration: '3s', target: 70 }, { duration: '3s', target: 0 },
    { duration: '3s', target: 70 }, { duration: '3s', target: 0 },
    { duration: '3s', target: 70 }, { duration: '3s', target: 0 },
    { duration: '3s', target: 70 }, { duration: '3s', target: 0 },
  ],
};

export default function () {
  http.post(URL, JSON.stringify({ n: 28 }), PARAMS);
  sleep(0.1);
}
