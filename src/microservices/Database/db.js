const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "jeff",
  password: "",
  database: "vaccine",
});

module.exports = pool;
