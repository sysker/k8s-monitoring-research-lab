#!/bin/bash
kubectl create configmap k6-test1 --from-file test1.js -n "metrics"