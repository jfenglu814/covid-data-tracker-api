const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "jeff",
  password: "",
  database: "84.51",
});

module.exports = pool;
