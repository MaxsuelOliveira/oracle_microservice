# 🐳 Oracle Microservice - Node.js + Express + Docker

Este microserviço permite executar **consultas SQL seguras** em um banco de dados **Oracle** através de chamadas HTTP.  
Ideal para integração entre sistemas, automações, bots e outros microserviços.

---

## 🚀 Tecnologias usadas

- Node.js + Express
- Oracle Instant Client (modo Thick)
- Docker & Docker Compose
- OracleDB via oracledb
- Middleware de segurança contra SQL Injection
- `.env` configurável

---

## 📦 Como rodar com Docker

### Pré-requisitos

- Docker Desktop instalado
- Banco Oracle acessível (externo ou em rede local)

### 1. Configure o `.env`

Crie um arquivo `.env` na raiz baseado em `.env.example`:

```env
DB_USER=usuario
DB_PASSWORD=senha
DB_HOST=host_ou_ip
DB_PORT=1521
DB_NAME=servicename
PORT=5000
```

## 2. Suba o serviço

```bash
docker-compose up --build
```

## A API estará disponível em

<http://localhost:5000/db/query>

<http://localhost:5000/db/update>

## 🔐 Segurança

Este microserviço possui um middleware que bloqueia comandos perigosos como:

<b>DROP</b>, <b>TRUNCATE</b>, <b>ALTER</b>, <b>--</b>, <b>/* ... */</b>

Além disso, as rotas exigem que os parâmetros <b>SQL</b> sejam passados via <b>POST</b>.


## 📬 Exemplo de requisição

🔍 POST /db/query

```json
{
  "sql": "SELECT * FROM clientes WHERE status = :status",
  "params": ["ativo"]
}
```

✏️ POST /db/update

```json
{
  "sql": "UPDATE clientes SET nome = :nome WHERE id = :id",
  "params": ["João", 42]
}
```

## ✅  New features

- Autenticação por token (JWT)
- Swagger/OpenAPI
- Rate Limit / Logs de auditoria
- Empacotamento como .exe com persistência local