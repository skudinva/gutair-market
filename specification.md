# Последовательность запуска проекта

```
cd backend
npm install
cp apps/account/.env-example apps/account/.env
cp apps/api/.env.example apps/api/.env
cp libs/shop/models/prisma/.env-example libs/shop/models/prisma/.env
cp apps/shop/shop.env.example apps/shop/.env
cp apps/file-vault/file-vault.env.example apps/file-vault/.env
cp apps/notify/notify.env-example apps/notify/.env
docker compose -f "apps/account/docker-compose.dev.yml" up -d
docker compose -f "apps/shop/docker-compose.dev.yml" up -d
docker compose -f "apps/file-vault/docker-compose.dev.yml" up -d
docker compose -f "apps/notify/docker-compose.dev.yml" up -d
npx nx run shop:db:migrate
npx nx run shop:db:seed
npx nx run notify:serve
npx nx run file-vault:serve
npx nx run account:serve
npx nx run shop:serve
npx nx run api:serve
```

Swagger [Readme app API](http://localhost:3000/spec#/)
