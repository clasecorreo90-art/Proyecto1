#!/usr/bin/env bash
set -euo pipefail

SERVICIOS=(
  "BACKEND/registro-service"
  "BACKEND/consulta-service"
  "BACKEND/notificacion-service"
  "BACKEND/profesor-service"
  "GATEWAY"
  "FRONTEND"
)

for servicio in "${SERVICIOS[@]}"; do
  echo "Instalando dependencias en $servicio"
  (cd "$servicio" && npm install)
done

echo "Construyendo imágenes con docker-compose"
docker-compose build

echo "Iniciando servicios"
docker-compose up
