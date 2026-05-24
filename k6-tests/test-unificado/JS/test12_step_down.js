/**
 * TEST 12 — Escalera descendente
 *
 * Objetivo: misma idea que el test 11 pero en sentido inverso
 */
import http from 'k6/http';
import { sleep } from 'k6';

const URL = 'http://unified-svc.metrics.svc.cluster.local/fibonacci';
const PARAMS = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  stages: [
    { duration: '1s',  target: 80  },
    { duration: '25s', target: 80  },
    { duration: '1s',  target: 60  },
    { duration: '25s', target: 60  },
    { duration: '1s',  target: 40  },
    { duration: '25s', target: 40  },
    { duration: '1s',  target: 20  },
    { duration: '25s', target: 20  },
    { duration: '5s',  target: 0   },
  ],
};

export default function () {
  http.post(URL, JSON.stringify({ n: 25 }), PARAMS);
  sleep(1);
}
