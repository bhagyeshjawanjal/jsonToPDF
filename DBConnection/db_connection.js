import mysql from "mysql2/promise";

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Temp@123',
  database: 'service_db',
};

let connection;

try {
    connection = await mysql.createConnection(dbConfig);
} catch (error) {
    console.error('Error connecting to database:', error);
}

export default connection;
