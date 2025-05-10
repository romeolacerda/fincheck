FROM node:22-alpine

WORKDIR /app

# Instala pg_isready para verificar o Postgres
RUN apk add --no-cache postgresql-client

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY prisma ./prisma/
COPY . .

RUN npx prisma generate
RUN yarn build


EXPOSE 3000

# Remove o migrate deploy daqui (vamos fazer apenas no runtime)
CMD ["sh", "-c", "yarn start:prod"]