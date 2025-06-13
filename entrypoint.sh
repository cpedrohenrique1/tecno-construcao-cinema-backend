until nc -z db 5432; do
  echo "Aguardando o banco de dados..."
  sleep 2
done

npx prisma migrate dev --name init && npm run start:dev