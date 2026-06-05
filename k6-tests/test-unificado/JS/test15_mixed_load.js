/**
 * TEST 15 — Carga heterogénea
 *
 * Objetivo: simular una carga realista donde distintos usuarios piden tamaños distintos
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

const LEVELS = [5, 5, 5, 5, 15, 15, 35];   // pesos: 4/7 ligero, 2/7 medio, 1/7 pesado

export const options = {
  vus: 30,
  duration: '90s',
};

export default function () {
  const n = LEVELS[Math.floor(Math.random() * LEVELS.length)];
  http.post(URL, JSON.stringify({ n }), PARAMS);
  sleep(0.5);
}
