#!/usr/bin/env bash
set -euo pipefail

# Crea archivos .env con valores predeterminados si no existen
ensure_env_file() {
  local env_path="$1"

  if [[ -f "$env_path" ]]; then
    echo "[env] Ya existe: $env_path"
    return
  fi

  echo "[env] Creando: $env_path"
  mkdir -p "$(dirname "$env_path")"

  case "$env_path" in
    ".env")
      cat > "$env_path" <<'EOF'
# Postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=akira_system
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# Backend services
REGISTRO_PORT=3001
CONSULTA_PORT=3002
NOTIFICACION_PORT=3003
PROFESOR_PORT=3004

# Gateway
GATEWAY_PORT=3000
REGISTRO_SERVICE_URL=http://registro-service:3001
CONSULTA_SERVICE_URL=http://consulta-service:3002
NOTIFICACION_SERVICE_URL=http://notificacion-service:3003
PROFESOR_SERVICE_URL=http://profesor-service:3004

# Frontend
FRONTEND_PORT=3005
GATEWAY_URL=http://gateway:3000
EOF
      ;;
    "BACKEND/registro-service/.env")
      cat > "$env_path" <<'EOF'
PORT=3001
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=akira_system
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
BLOCK_DURATION_MINUTES=1
BLOCK_CHECK_INTERVAL_MS=10000
EOF
      ;;
    "BACKEND/consulta-service/.env")
      cat > "$env_path" <<'EOF'
PORT=3002
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=akira_system
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
EOF
      ;;
    "BACKEND/notificacion-service/.env")
      cat > "$env_path" <<'EOF'
PORT=3003
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=akira_system
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
EOF
      ;;
    "BACKEND/profesor-service/.env")
      cat > "$env_path" <<'EOF'
PORT=3004
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=akira_system
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
EOF
      ;;
    "GATEWAY/.env")
      cat > "$env_path" <<'EOF'
PORT=3000
REGISTRO_SERVICE_URL=http://registro-service:3001
CONSULTA_SERVICE_URL=http://consulta-service:3002
NOTIFICACION_SERVICE_URL=http://notificacion-service:3003
PROFESOR_SERVICE_URL=http://profesor-service:3004
EOF
      ;;
    "FRONTEND/.env")
      cat > "$env_path" <<'EOF'
PORT=3005
GATEWAY_URL=http://localhost:3000
EOF
      ;;
    *)
      echo "[env] Ruta no soportada: $env_path"
      return 1
      ;;
  esac
}

ENV_FILES=(
  ".env"
  "BACKEND/registro-service/.env"
  "BACKEND/consulta-service/.env"
  "BACKEND/notificacion-service/.env"
  "BACKEND/profesor-service/.env"
  "GATEWAY/.env"
  "FRONTEND/.env"
)

for env_file in "${ENV_FILES[@]}"; do
  ensure_env_file "$env_file"
done

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
  (cd "$servicio" && npm ci)
done

echo "Construyendo imagenes con docker-compose"
docker-compose build

echo "Iniciando servicios"
docker-compose up
