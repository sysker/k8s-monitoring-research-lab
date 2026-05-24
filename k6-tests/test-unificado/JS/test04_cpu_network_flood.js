/**
 * TEST 04 — Saturación de red y CPU
 *
 * Objetivo: maximizar el consumo de CPU y el tráfico de red solicitando n=45 con muchos VUs y sin sleep
 * Ejecutar con precaución
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  vus: 50,
  duration: '60s',
};

export default function () {
  http.post(URL, JSON.stringify({ n: 45 }), PARAMS);
  sleep(0.1);
}
