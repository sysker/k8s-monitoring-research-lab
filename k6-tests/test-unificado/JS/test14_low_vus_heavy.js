/**
 * TEST 14 — Baja concurrencia, trabajo pesado
 *
 * Objetivo: pocos VUs pero cada uno solicita un número muy alto
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  vus: 4,
  duration: '90s',
};

export default function () {
  http.post(URL, JSON.stringify({ n: 62 }), PARAMS);
  // Sin sleep: el propio tiempo de cómputo actúa como limitador natural
}
