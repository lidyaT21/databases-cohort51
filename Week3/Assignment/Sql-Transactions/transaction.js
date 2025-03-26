import { connection } from "./connection.js";

// Ensure the database is selected
connection.query("USE bankDatabase", (err) => {
  if (err) {
    console.error("Error selecting database:", err);
    return;
  }
  console.log("Database selected.");

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction: " + err.stack);
      return;
    }

    const senderAccountNumber = 1001;
    const receiverAccountNumber = 1002;
    const amount = 1000;

    // Queries using placeholders for security
    const deductAmountFromSenderAccount = `UPDATE account SET balance = balance - ? WHERE account_number = ?`;
    const addAmountToReceiverAccount = `UPDATE account SET balance = balance + ? WHERE account_number = ?`;
    const logSenderTransaction = `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, CURDATE(), ?)`;
    const logReceiverTransaction = `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, CURDATE(), ?)`;

    // Deduct amount from sender
    connection.query(
      deductAmountFromSenderAccount,
      [amount, senderAccountNumber],
      (err) => {
        if (err) {
          return connection.rollback(() =>
            console.error("Error deducting amount: " + err.stack)
          );
        }

        // Add amount to receiver
        connection.query(
          addAmountToReceiverAccount,
          [amount, receiverAccountNumber],
          (err) => {
            if (err) {
              return connection.rollback(() =>
                console.error("Error adding amount: " + err.stack)
              );
            }

            // Log sender transaction
            connection.query(
              logSenderTransaction,
              [
                senderAccountNumber,
                -amount,
                `Transfer to account ${receiverAccountNumber}`,
              ],
              (err) => {
                if (err) {
                  return connection.rollback(() =>
                    console.error(
                      "Error logging sender transaction: " + err.stack
                    )
                  );
                }

                // Log receiver transaction
                connection.query(
                  logReceiverTransaction,
                  [
                    receiverAccountNumber,
                    amount,
                    `Transfer from account ${senderAccountNumber}`,
                  ],
                  (err) => {
                    if (err) {
                      return connection.rollback(() =>
                        console.error(
                          "Error logging receiver transaction: " + err.stack
                        )
                      );
                    }

                    // Commit transaction
                    connection.commit((err) => {
                      if (err) {
                        return connection.rollback(() =>
                          console.error(
                            "Error committing transaction: " + err.stack
                          )
                        );
                      }

                      console.log("Transaction completed successfully.");
                      connection.end((err) => {
                        if (err) {
                          console.error(
                            "Error closing connection: " + err.stack
                          );
                        } else {
                          console.log("Connection closed.");
                        }
                      });
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});
