// src/services/oracle.service.js
const getConnection = require('../config/oracle');

// Comandos potencialmente perigosos que não queremos permitir
const blockedKeywords = ['DROP', 'TRUNCATE', 'DELETE FROM', '--', '/*', '*/', 'ALTER'];

const isQuerySafe = (sql) => {
  const upperSql = sql.toUpperCase();
  return !blockedKeywords.some(keyword => upperSql.includes(keyword));
};

const executeQuery = async (sql, params = []) => {
  if (!isQuerySafe(sql)) {
    throw new Error("Query bloqueada por segurança.");
  }

  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(sql, params);
    return result.rows;
  } catch (err) {
    console.error("[Oracle Query Error]", err);
    throw err;
  } finally {
    if (conn) await conn.close();
  }
};

const executeUpdate = async (sql, params = []) => {
  if (!isQuerySafe(sql)) {
    throw new Error("Query bloqueada por segurança.");
  }

  let conn;
  try {
    conn = await getConnection();
    const result = await conn.execute(sql, params, { autoCommit: true });
    return result.rowsAffected;
  } catch (err) {
    console.error("[Oracle Update Error]", err);
    throw err;
  } finally {
    if (conn) await conn.close();
  }
};

module.exports = { executeQuery, executeUpdate };
