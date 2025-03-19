import { connection } from "./dbConnect.js";

connection.query("CREATE DATABASE IF NOT EXISTS assignmentDatabase", (err) => {
  if (err) {
    console.error("Error creating assignment database:", err);
    return;
  }
  console.log("assignment database created");
});

connection.query("USE assignmentDatabase", (err) => {
  if (err) {
    console.error("Error using assignment database:", err);
    return;
  }
  console.log("Using assignment database");
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS authors (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(100) NOT NULL,
    university VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    h_index INT NOT NULL,
    gender ENUM('M', 'F') NOT NULL
)`;

connection.query(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating authors table:", err);
    return;
  }
  console.log("Authors table created");
});

const addMentorColumnQuery = `
    ALTER TABLE Authors
    ADD COLUMN IF NOT EXISTS mentor INT,
    ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES Authors(author_id);
  `;
connection.query(addMentorColumnQuery, (err, result) => {
  if (err) throw err;
  console.log("mentor column added.");
});
connection.end();
