#!/bin/bash
set -euo pipefail
export HOST_NAME=appointment.app.pannucorp.com

git pull
docker-compose build
docker-compose up -d
docker system prune -a --force
