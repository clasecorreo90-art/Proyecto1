run-db:
	docker compose up postgres

run-services:
	docker compose up --build registro-service consulta-service notificacion-service profesor-service gateway frontend
