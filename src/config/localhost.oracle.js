// src/config/oracle.js
const oracledb = require('oracledb');
require('dotenv').config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Ativa o modo thick
oracledb.initOracleClient({ libDir: 'C:\\instantclient_23_7' }); // Altere para seu caminho real

const getConnection = async () => {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    });
    console.log('[OracleDB] Conexão estabelecida.');
    return connection;
  } catch (err) {
    console.error('[OracleDB] Erro ao conectar:', err);
    throw err;
  }
};

module.exports = getConnection;
