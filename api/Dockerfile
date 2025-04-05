# Usa a imagem oficial do Node.js
FROM node:22

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências primeiro (otimiza cache)
COPY package.json yarn.lock ./

# Instala as dependências sem modificar o lockfile
RUN yarn install --frozen-lockfile

# Copia todo o código do projeto para dentro do container
COPY . .

# Gera os tipos do Prisma
RUN npx prisma generate

# Compila a aplicação (se for TypeScript)
RUN yarn build

# Expõe a porta da API
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["yarn", "start:prod"]
