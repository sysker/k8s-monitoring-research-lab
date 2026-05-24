/**
 * TEST 07 — Picos múltiples repetidos
 *
 * Objetivo: repetir el patrón de pico/valle varias veces seguidas
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

// 4 ciclos pico/valle
export const options = {
  stages: [
    { duration: '5s',  target: 80 },
    { duration: '10s', target: 80 },
    { duration: '5s',  target: 5  },
    { duration: '10s', target: 5  },
    { duration: '5s',  target: 80 },
    { duration: '10s', target: 80 },
    { duration: '5s',  target: 5  },
    { duration: '10s', target: 5  },
    { duration: '5s',  target: 80 },
    { duration: '10s', target: 80 },
    { duration: '5s',  target: 5  },
    { duration: '10s', target: 5  },
    { duration: '5s',  target: 80 },
    { duration: '10s', target: 80 },
    { duration: '5s',  target: 0  },
  ],
};

export default function () {
  http.post(URL, JSON.stringify({ n: 28 }), PARAMS);
  sleep(0.5);
}
