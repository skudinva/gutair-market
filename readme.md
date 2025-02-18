# Руководство по работе с проектом

## Последовательность запуска проекта

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
npx nx run shop:db:generate
npx nx run shop:db:migrate
npx nx run cli:build
!!!!!!!!!!!npx nx run shop:db:seed
!!!!!!!!!!!node dist/apps/cli/main.js --generate 20 postgres://admin:123456@localhost:5432/shop
npx nx run notify:serve
npx nx run file-vault:serve
npx nx run account:serve
npx nx run shop:serve
npx nx run api:serve
cd ../frontend/
npm run start
```

Swagger [app API](http://localhost:3000/spec#/)

Guitar Shop [React App](http://localhost:5000)

## Список переменных окружения микросервисов

### frontend

```
PORT=5000 - порт сервиса
```

### api

```
PORT=3000 - порт сервиса
```

### account

```
MONGO_DB=shop-users - имя БД
MONGO_HOST=localhost - хост БД
MONGO_PORT=27017 - порт БД
MONGO_USER=admin - имя пользователя БД
MONGO_PASSWORD=123456 - пароль пользователя БД
MONGO_AUTH_BASE=admin - имя пользователя интерфейса БД
JWT_ACCESS_TOKEN_SECRET=SxLV7lDhLUICkSdjr8xu - секретный ключ access_token
JWT_ACCESS_TOKEN_EXPIRES_IN=500m - время жизни access_token
RABBIT_HOST=localhost - хост Rabbit
RABBIT_PASSWORD=test - пароль Rabbit
RABBIT_PORT=5672 - порт Rabbit
RABBIT_USER=admin - имя пользователя Rabbit
RABBIT_QUEUE=shop.notify.income - имя очереди
RABBIT_EXCHANGE=shop.notify - имя exchange
PORT=3001 - порт сервиса
```

### file-vault

```
UPLOAD_DIRECTORY_PATH=upload - папка хранения вложений
MONGO_HOST=localhost - хост БД
MONGO_PORT=27018 - порт БД
MONGO_DB=shop-file-vault - имя БД
MONGO_USER=admin - имя пользователя БД
MONGO_PASSWORD=test - пароль пользователя БД
MONGO_AUTH_BASE=admin - имя пользователя интерфейса БД
SERVE_ROOT=static - путь доступа к файлам
PORT=3003 - порт сервиса
```

### notify

```
RABBITMQ_DEFAULT_USER=admin - имя пользователя по умолчанию для Rabbit
RABBITMQ_DEFAULT_PASS=test - пароль пользователя по умолчанию для Rabbit
RABBIT_HOST=localhost - хост Rabbit
RABBIT_PASSWORD=test - пароль Rabbit
RABBIT_PORT=5672 - порт Rabbit
RABBIT_USER=admin - имя пользователя Rabbit
RABBIT_QUEUE=shop.notify.income - имя очереди
RABBIT_EXCHANGE=shop.notify - имя exchange
PORT=3004 - порт сервиса
MAIL_SMTP_HOST=localhost - хост smtp-сервера
MAIL_SMTP_PORT=8025 - порт smtp-сервера
MAIL_USER_NAME=shopMail - имя пользователя smtp-сервера
MAIL_USER_PASSWORD=1111 - пароль пользователя smtp-сервера
MAIL_FROM=noreply@shop.com - адрес отправителя почтовых уведомлений
```

### shop

```
POSTGRES_USER=admin - имя пользователя БД
POSTGRES_PASSWORD=123456 - пароль пользователя БД
POSTGRES_DB=shop - имя БД
PGADMIN_DEFAULT_EMAIL=skudinva@yandex.ru - имя пользователя pgadmin
PGADMIN_DEFAULT_PASSWORD=123456 - пароль пользователя pgadmin
DATABASE_URL=postgres://admin:123456@localhost:5432/shop - строка подключения к БД
PORT=3002 - порт сервиса
RABBIT_HOST=localhost - хост Rabbit
RABBIT_PASSWORD=test - пароль Rabbit
RABBIT_PORT=5672 - порт Rabbit
RABBIT_USER=admin - имя пользователя Rabbit
RABBIT_QUEUE=shop.notify.income - имя очереди
RABBIT_EXCHANGE=shop.notify - имя exchange
RABBITMQ_DEFAULT_USER=admin - имя пользователя по умолчанию для Rabbit
RABBITMQ_DEFAULT_PASS=test - пароль пользователя по умолчанию для Rabbit
```
