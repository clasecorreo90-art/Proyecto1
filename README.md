# Sistema de Registro de Salones

Este repositorio contiene un sistema distribuido para registrar el uso de salones por profesores y consultar disponibilidad en la universidad. Incluye:

- **BACKEND**: cuatro microservicios en Node.js (`registro-service`, `consulta-service`, `notificacion-service`, `profesor-service`) con capas de aplicación, infraestructura, operación, persistencia y servicios.
- **GATEWAY**: un API Gateway que enruta peticiones a los microservicios usando Express y Axios.
- **FRONTEND**: una SPA estática simple con vistas de registro y consulta, servida por un pequeño servidor Express.
- **PostgreSQL**: base de datos con tablas para profesores, clases, horarios y registros, inicializadas desde `db/init.sql`.
- **Docker / docker-compose**: cada microservicio, el gateway y el frontend tienen Dockerfile individual y un `docker-compose.yml` levanta toda la arquitectura junto con PostgreSQL.

## Ejecutar el sistema

1. Asegura tener Docker y Docker Compose instalados.
2. Ejecuta el script de preparación:
   ```bash
   ./setup.sh
   ```
   _El script instala dependencias (`npm install`) en cada servicio, construye las imágenes y levanta el stack._
3. Alternativamente, puedes ejecutar manualmente:
   ```bash
   docker-compose up --build
   ```
4. El frontend queda disponible en `http://localhost:3005`, el gateway en `http://localhost:3000` y PostgreSQL en `localhost:5432`.

## Servicios

- **POST /registro**: guarda la ocupación de un salón por profesor.
- **GET /salones?bloque=1**: consulta estados de salones por bloque.
- **GET /notificaciones**: detecta posibles ausencias según horarios.
- **GET /profesor/:id** y **GET /profesor/:id/clases**: gestionan datos de profesores.

El frontend consume el gateway (`http://gateway:3000`) y permite registrar clases, revisar disponibilidad por bloque y ver alertas de ausencias.
