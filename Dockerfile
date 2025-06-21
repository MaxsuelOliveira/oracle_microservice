FROM node:18

# Diretório do app
WORKDIR /app

# Instala dependências básicas
RUN apt-get update && apt-get install -y libaio1 unzip curl

# Baixa e extrai Oracle Instant Client
RUN curl -O https://download.oracle.com/otn_software/linux/instantclient/2111000/instantclient-basiclite-linux.x64-21.11.0.0.0dbru.zip && \
    unzip instantclient-basiclite-linux.x64-21.11.0.0.0dbru.zip -d /opt/oracle && \
    rm instantclient-basiclite-linux.x64-21.11.0.0.0dbru.zip

# Configura variáveis para o modo Thick
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_11
ENV PATH=$LD_LIBRARY_PATH:$PATH

# Copia arquivos
COPY package*.json ./
RUN npm install
COPY . .

# Expõe a porta da API
EXPOSE 5000

CMD ["npm", "start"]
