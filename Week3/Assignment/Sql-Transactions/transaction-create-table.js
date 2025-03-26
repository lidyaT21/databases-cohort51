import { connection } from "./connection.js";

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");

  // Create the 'bankDatabase' if it doesn't exist
  connection.query("CREATE DATABASE IF NOT EXISTS bankDatabase", (err) => {
    if (err) {
      console.error("Error creating bank database:", err);
      return;
    }
    console.log("bankDatabase created or already exists");

    // Use the 'bankDatabase' database
    connection.query("USE bankDatabase", (err) => {
      if (err) {
        console.error("Error using bank database:", err);
        return;
      }
      console.log("Using bank database");

      // Create the account table
      const createAccountTable = `
        CREATE TABLE IF NOT EXISTS account (
            account_number INT PRIMARY KEY,
            balance DECIMAL(10, 2)
        );
      `;

      // Create the account_changes table
      const createAccountChangesTable = `
        CREATE TABLE IF NOT EXISTS account_changes (
            change_number INT PRIMARY KEY AUTO_INCREMENT,
            account_number INT,
            amount DECIMAL(10, 2),
            changed_date DATE,
            remark VARCHAR(255),
            FOREIGN KEY (account_number) REFERENCES account(account_number)
        );
      `;

      // Execute the queries to create the tables
      connection.query(createAccountTable, (err) => {
        if (err) {
          console.error("Error creating account table: " + err.stack);
          return;
        }
        console.log("Account table created successfully.");

        connection.query(createAccountChangesTable, (err) => {
          if (err) {
            console.error("Error creating account_changes table: " + err.stack);
            return;
          }
          console.log("Account_changes table created successfully.");

          // Close the database connection
          connection.end((err) => {
            if (err) {
              console.error(
                "Error closing the database connection: " + err.stack
              );
              return;
            }
            console.log("Database connection closed.");
          });
        });
      });
    });
  });
});
