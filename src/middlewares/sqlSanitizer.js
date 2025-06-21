// Middleware para verificar SQL injection
const blockedKeywords = ['DROP', 'TRUNCATE', 'DELETE FROM', '--', '/*', '*/', 'ALTER'];

const sqlSanitizer = (req, res, next) => {
  const sql = req.body?.sql;
  if (!sql) {
    return res.status(400).json({ success: false, error: 'SQL não fornecido.' });
  }

  const upperSql = sql.toUpperCase();

  const found = blockedKeywords.find(keyword => upperSql.includes(keyword));
  if (found) {
    return res.status(403).json({
      success: false,
      error: `Comando SQL bloqueado por segurança: "${found}"`
    });
  }

  next(); // Está limpo, segue
};

module.exports = sqlSanitizer;