const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

// Create the meetup database
connection.query("CREATE DATABASE IF NOT EXISTS meetup", (err) => {
  if (err) {
    console.error("Error creating meetup database:", err);
    return;
  }
  console.log("meetup database created");
});

// Use the meetup database
connection.query("USE meetup", (err) => {
  if (err) {
    console.error("Error using meetup database:", err);
    return;
  }
  console.log("Using meetup database");
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  // Create the Invitee table
  const createInviteeTable = `
    CREATE TABLE IF NOT EXISTS Invitee (
        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
        invitee_name VARCHAR(255) NOT NULL,
        invited_by VARCHAR(255) NOT NULL
    )
`;
  connection.query(createInviteeTable, function (err, result) {
    if (err) throw err;
    console.log("Invitee Table created successfully!");
  });

  // create the room table
  const createRoomTable = ` CREATE TABLE IF NOT EXISTS Room (
        room_no INT AUTO_INCREMENT PRIMARY KEY,
        room_name VARCHAR(255) NOT NULL,
       floor_no INT NOT NULL
    )`;
  connection.query(createRoomTable, function (err, result) {
    if (err) throw err;
    console.log("Room Table created successfully!");
  });

  // Create the Meeting table
  const createMeetingTable = `
    CREATE TABLE IF NOT EXISTS Meeting (
        meeting_no INT AUTO_INCREMENT PRIMARY KEY,
        meeting_title VARCHAR(255) NOT NULL,
        starting_time DATETIME NOT NULL,
        ending_time DATETIME NOT NULL,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES Room(room_no)
    )
`;
  connection.query(createMeetingTable, function (err, result) {
    if (err) throw err;
    console.log("Meeting Table created successfully!");
  });
  // Insert 5 rows into Invitee table
  const insertInviteeRows = `
    INSERT INTO Invitee (invitee_name, invited_by)
    VALUES
      ('Alice Johnson', 'Bob Smith'),
      ('Charlie Brown', 'David Lee'),
     ('Emily White', 'Alice Johnson'),
('Michael Scott', 'Jim Halpert'),
('Dwight Schrute', 'Michael Scott')`;
  connection.query(insertInviteeRows, function (err, result) {
    if (err) throw err;
    console.log("Rows inserted into Invitee table");
  });

  // Insert rows into the Room table
  const insertRoomRows = `
    INSERT INTO Room (room_name, floor_no)
    VALUES
        ('Conference Room 1', 1),
        ('Conference Room 2', 2),
        ('Meeting Room 1', 1),
        ('Meeting Room 2', 2),
        ('Board Room', 3)
`;
  connection.query(insertRoomRows, function (err, result) {
    if (err) throw err;
    console.log("Rows inserted into room table");
  });
  // Insert rows into the Meeting table
  const insertMeetingRows = `
    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
    VALUES
        ('Project Kickoff', '2022-01-01 09:00:00', '2022-01-01 10:00:00', 1),
        ('Team Standup', '2022-01-02 10:00:00', '2022-01-02 10:30:00', 2),
        ('Client Meeting', '2022-01-03 14:00:00', '2022-01-03 15:00:00', 3),
        ('Brainstorming Session', '2022-01-04 16:00:00', '2022-01-04 17:00:00', 4),
        ('Board Meeting', '2022-01-05 11:00:00', '2022-01-05 12:00:00', 5)
`;
  connection.query(insertMeetingRows, function (err, result) {
    if (err) throw err;
    console.log("Rows inserted into meeting table");
  });
  // Close the connection
  connection.end();
});
