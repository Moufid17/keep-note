ps:
	docker compose ps

up:
	docker compose up -d

down:
	docker compose down

remove:
	docker compose down -v

install:
	docker compose exec server npm install

dev:
	docker compose exec server npm run dev

build:
	docker compose exec server npm run build

bash:
	docker compose exec server /bin/sh

logs:
	docker compose logs server -f

# Prisma commands
dbreset:
	docker compose exec server npx prisma db push --force-reset # Not to be used in your production environment : to push the initial schema to the database. --force-reset to ignore the current state of the database and apply the schema from scratch.

dbset:
	docker compose exec server npx prisma db push # Not to be used in your production environment : to push the initial schema to the database. --force-reset to ignore the current state of the database and apply the schema from scratch.

dbupdate:
	docker compose exec server npx prisma migrate dev  # To create a new migration based on the changes you made to your Prisma schema.

dbstatus:
	docker compose exec server npx prisma migrate status

dpm:
	docker compose exec server npx prisma migrate dev --name $(name) # To create a new migration based on the changes you made to your Prisma schema.

seed:
	docker compose exec server npx prisma db seed # To seed the database with some initial data.