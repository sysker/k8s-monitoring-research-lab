/**
 * TEST 01 — Baseline: carga baja sostenida
 *
 * Objetivo: establecer la línea base de referencia con carga mínima
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  vus: 5,
  duration: '60s',
};

export default function () {
  http.post(URL, JSON.stringify({ n: 10 }), PARAMS);
  sleep(1);
}
