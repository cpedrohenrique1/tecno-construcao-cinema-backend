#!/bin/sh
until nc -z db 5432; do
  echo "Aguardando o banco de dados..."
  sleep 2
done

npx prisma migrate dev --name init

# Inicia o server backend em segundo plano
npm run start:dev &

# Em seguida, inicia o Prisma Studio em primeiro plano
npx prisma studio

# Opcional: aguarda a finalização de todos os processos em background
wait
