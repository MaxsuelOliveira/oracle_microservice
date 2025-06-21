// src/config/oracle.js
const oracledb = require('oracledb');
require('dotenv').config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const getConnection = async () => {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: `${process.env.DB_HOST}:1521/${process.env.DB_NAME}`
    });
    console.log('[OracleDB] Conexão estabelecida.');
    return connection;
  } catch (err) {
    console.error('[OracleDB] Erro ao conectar:', err);
    throw err;
  }
};

module.exports = getConnection;
