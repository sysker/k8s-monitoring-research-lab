/**
 * TEST 02 — Carga sostenida alta: estrés de CPU
 *
 * Objetivo: saturar la CPU durante un período prolongado
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  vus: 20,
  duration: '90s',
};

export default function () {
  http.post(URL, JSON.stringify({ n: 36 }), PARAMS);
  sleep(0.5);
}
