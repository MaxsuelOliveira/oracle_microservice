const { executeQuery, executeUpdate } = require('../services/oracle.service');

const queryHandler = async (req, res) => {
  try {
    const { sql, params } = req.body;

    if (!sql) {
      return res.status(400).json({ success: false, error: 'SQL não fornecido.' });
    }

    const result = await executeQuery(sql, params || []);
    res.json({ success: true, result });
  } catch (err) {
    res.status(422).json({ success: false, error: err.message });
  }
};

const updateHandler = async (req, res) => {
  try {
    const { sql, params } = req.body;

    if (!sql) {
      return res.status(400).json({ success: false, error: 'SQL não fornecido.' });
    }

    const affected = await executeUpdate(sql, params || []);
    res.json({ success: true, affected });
  } catch (err) {
    res.status(422).json({ success: false, error: err.message });
  }
};

module.exports = { queryHandler, updateHandler };
