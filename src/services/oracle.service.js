const oracledb = require("oracledb");

// indica para usar o modo Thick
// oracledb.initOracleClient({ libDir: 'C:\\instantclient_23_7' });
oracledb.initOracleClient({ libDir: "/opt/oracle/instantclient_21_11" });

let pool;

async function initPool() {
  if (!pool) {
    pool = await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectString: process.env.DB_CONNECT_STRING,
      poolMin: 1,
      poolMax: 10,
      poolIncrement: 1,
    });
  }
}

async function executeQuery(sql, params = {}) {
  await initPool();
  let connection;

  try {
    connection = await pool.getConnection();

    const result = await connection.execute(sql, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: false, // só commit em updates
    });

    return result.rows;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (e) {
        console.error("Erro ao fechar conexão:", e);
      }
    }
  }
}

async function executeUpdate(sql, params = {}) {
  await initPool();
  let connection;

  try {
    connection = await pool.getConnection();

    const result = await connection.execute(sql, params, {
      autoCommit: true, // commit automático em update/insert/delete
    });

    return result.rowsAffected; // número de linhas afetadas
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (e) {
        console.error("Erro ao fechar conexão:", e);
      }
    }
  }
}

module.exports = { executeQuery, executeUpdate };
