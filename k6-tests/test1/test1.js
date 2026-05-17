import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  http.get('http://fibonacci-svc.testing.svc.cluster.local/fibonacci');
  sleep(1);
}