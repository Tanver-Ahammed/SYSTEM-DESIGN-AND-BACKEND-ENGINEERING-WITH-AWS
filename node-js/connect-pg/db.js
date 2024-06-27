const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "system_design",
  password: "12345",
  port: 5432, // default PostgreSQL port
});

client.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to database');
  }
});

module.exports = {
  query: (text, params, callback) => {
    console.log("Query:", text, params);
    return client.query(text, params, callback);
  },
};
