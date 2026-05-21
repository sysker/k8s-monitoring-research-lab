#!/bin/bash
kubectl create configmap k6-tests_unificados --from-file=./JS/ -n "metrics" --dry-run=client -o yaml | kubectl apply -f -