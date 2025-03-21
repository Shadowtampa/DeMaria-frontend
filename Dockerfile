# Usando a última versão do Node.js
FROM node:latest

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando os arquivos de package.json e yarn.lock
COPY package*.json ./

# Instalando as dependências com Yarn
RUN yarn install

# Copiando o restante do código
COPY . .

# Construindo a aplicação
RUN yarn build

# Usando um servidor para servir os arquivos estáticos
FROM docker.io/nginx:alpine
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

# Expondo a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"] 