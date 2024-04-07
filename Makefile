up:
	mkdir -p ./frontend/dist
	docker compose up -d --build

down:
	docker compose down

re: down
	make up