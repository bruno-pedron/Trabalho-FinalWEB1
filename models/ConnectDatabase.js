const { Pool } = require("pg");

const db = new Pool({
  connectionString: "postgresql://neondb_owner:npg_3Ef9PLDwVqyJ@ep-calm-cake-ac4qutf4-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false, // Necessário para conexão com Neon
  },
});

module.exports = db;