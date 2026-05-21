/**
 * TEST 03 — Carga sostenida alta: estrés de red
 *
 * Objetivo: maximizar el tráfico de red manteniendo la CPU moderada
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  vus: 40,
  duration: '90s',
};

export default function () {
  http.post(URL, JSON.stringify({ n: 30 }), PARAMS);
  sleep(0.2);
}
