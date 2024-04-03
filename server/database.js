const Pool = require("pg").Pool;

const pool = new Pool(
    {user: "postgres",
    database: "fresh",
    password: "letterboxd",
    host:"localhost",
    port:5432,
    }
)

module.exports=pool;