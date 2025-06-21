FROM oraclelinux:8

# Atualiza pacotes e instala dependências
RUN dnf -y install oracle-release-el8 && \
    dnf -y install libaio unzip curl && \
    dnf clean all

# Instala Node.js 18 LTS via Nodesource
RUN curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    dnf -y install nodejs && \
    dnf clean all

# Cria diretório de trabalho
WORKDIR /app

# Baixa e instala o Oracle Instant Client
RUN curl -O https://download.oracle.com/otn_software/linux/instantclient/2111000/instantclient-basiclite-linux.x64-21.11.0.0.0dbru.zip && \
    unzip instantclient-basiclite-linux.x64-21.11.0.0.0dbru.zip -d /opt/oracle && \
    rm instantclient-basiclite-linux.x64-21.11.0.0.0dbru.zip

# Configura variáveis de ambiente
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_11
ENV PATH=$LD_LIBRARY_PATH:$PATH

# Copia e instala dependências
COPY package*.json ./
RUN npm install

# Copia código-fonte
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
