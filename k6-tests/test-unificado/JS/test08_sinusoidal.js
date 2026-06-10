/**
 * TEST 08 — Carga oscilante sinusoidal
 *
 * Objetivo: aproximar una onda sinusoidal de ~90 s de período usando muchos stages cortos
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL    = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

// Parámetros de la onda
const VU_MIN        = 5;    // VUs en el valle
const VU_MAX        = 40;   // VUs en el pico
const CYCLES        = 2;    // ciclos completos
const STEPS_PER_CYCLE = 18; // muestras por ciclo (resolución de la discretización)
const STEP_DURATION = 4;    // segundos por stage

// Fórmula: VU_MIN + (VU_MAX - VU_MIN) * (sin(2π·i/STEPS_PER_CYCLE) + 1) / 2
const totalSteps = CYCLES * STEPS_PER_CYCLE
const stages = Array.from({ length: totalSteps }, (_, i) => ({
  duration: `${STEP_DURATION}s`,
  target: Math.round(
    VU_MIN + (VU_MAX - VU_MIN) * (Math.sin((2 * Math.PI * i) / STEPS_PER_CYCLE) + 1) / 2
  ),
}));

export const options = { stages };

export default function () {
  http.post(URL, JSON.stringify({ n: 3 }), PARAMS);
  sleep(1);
}
