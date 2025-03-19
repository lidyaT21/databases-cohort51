import { connection } from "./dbConnect.js";

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  connection.query("USE assignmentDatabase", (err) => {
    if (err) {
      console.error("Error using assignment database:", err);
      return;
    }
    console.log("Using assignment database");
  });
  const createResearchPapersTableQuery = ` 
    CREATE TABLE IF NOT EXISTS Research_Papers (
        paper_id INT PRIMARY KEY,
        paper_title VARCHAR(255),
        conference VARCHAR(255),
        publish_date DATE
     )`;

  const createAuthorPapersTableQuery = `
    CREATE TABLE IF NOT EXISTS Author_Papers (
        author_id INT,
        paper_id INT,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES Authors(author_id),
        FOREIGN KEY (paper_id) REFERENCES Research_Papers(paper_id)
     )`;
  const insertAuthorsQuery = `
        INSERT INTO Authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor) VALUES
        (1, 'Alice Johnson', 'Harvard University', '1980-04-12', 15, 'F', NULL),
        (2, 'John Smith', 'Stanford University', '1975-09-23', 18, 'M', NULL),
        (3, 'Emily Brown', 'Massachusetts Institute of Technology', '1986-06-30', 12, 'F', NULL),
        (4, 'Michael Davis', 'California Institute of Technology', '1978-02-15', 14, 'M', 2),
        (5, 'Sophia Lee', 'Yale University', '1982-11-08', 16, 'F', 1),
        (6, 'Daniel Wilson', 'University of Cambridge', '1977-07-19', 20, 'M', 3),
        (7, 'Olivia Taylor', 'Princeton University', '1984-03-26', 13, 'F', 2),
        (8, 'Matthew Anderson', 'Columbia University', '1979-10-17', 17, 'M', NULL),
        (9, 'Emma Martinez', 'University of Oxford', '1981-08-04', 19, 'F', 5),
        (10, 'David Rodriguez', 'ETH Zurich', '1976-12-09', 16, 'M', 4),
        (11, 'Lily Harris', 'University of Tokyo', '1983-05-18', 14, 'F', 7),
        (12, 'William Baker', 'University of California, Berkeley', '1980-09-15', 18, 'M', NULL),
        (13, 'Grace Campbell', 'Tsinghua University', '1977-11-22', 15, 'F', 8),
        (14, 'James Young', 'University of Toronto', '1979-02-28', 17, 'M', 6),
        (15, 'Ava White', 'University of Melbourne', '1985-07-07', 12, 'F', 11)
    `;

  const insertResearchPapersQuery = `
    INSERT INTO Research_Papers (paper_id, paper_title, conference, publish_date) VALUES
        (1, 'Machine Learning Advances', 'ICML', '2020-05-15'),
        (2, 'Quantum Computing Applications', 'QIP', '2021-02-28'),
        (3, 'Biomedical Innovations', 'IEEE EMBC', '2019-11-10'),
        (4, 'Environmental Sustainability Strategies', 'ISEC', '2020-08-20'),
        (5, 'Artificial Intelligence in Healthcare', 'IEEE BIBM', '2021-04-30'),
        (6, 'Renewable Energy Technologies', 'IREC', '2018-06-25'),
        (7, 'Space Exploration Developments', 'IAC', '2017-09-12'),
        (8, 'Cybersecurity Trends', 'IEEE CNS', '2019-03-05'),
        (9, 'Economic Forecasting Models', 'ISEM', '2018-10-08'),
        (10, 'Social Media Analytics', 'ACM WebSci', '2017-12-22'),
        (11, 'Robotics in Manufacturing', 'ICAR', '2019-01-18'),
        (12, 'Climate Change Impacts', 'IGBP', '2020-07-14'),
        (13, 'Smart Cities Infrastructure', 'IEEE SmartCity', '2019-04-19'),
        (14, 'Neuroscience Breakthroughs', 'CNS', '2018-11-30'),
        (15, 'Blockchain Applications', 'IEEE Blockchain', '2021-06-02'),
        (16, 'Genomics Research Progress', 'ISCB', '2017-08-05'),
        (17, 'Urban Transportation Systems', 'IEEE ITSC', '2018-03-28'),
        (18, 'Astronomy Discoveries', 'IAU', '2019-10-01'),
        (19, 'Water Resource Management', 'IWRA', '2017-04-16'),
        (20, 'Materials Engineering Innovations', 'TMS', '2018-12-09'),
        (21, 'Food Science Developments', 'IFT', '2020-09-26'),
        (22, 'Privacy Protection Strategies', 'IEEE S&P', '2019-02-10'),
        (23, 'Educational Technology Trends', 'AERA', '2018-05-07'),
        (24, 'Cancer Research Advances', 'AACR', '2021-01-05'),
        (25, 'Innovations in Telecommunications', 'IEEE GLOBECOM', '2019-06-30'),
        (26, 'Transportation Infrastructure Planning', 'TRB', '2018-02-14'),
        (27, 'Data Science Applications', 'IEEE BigData', '2017-07-21'),
        (28, 'Renewable Agriculture Practices', 'ASA', '2019-11-27'),
        (29, 'Physics Breakthroughs', 'APS March Meeting', '2018-10-03'),
        (30, 'Health Informatics Developments', 'AMIA', '2020-03-18')
`;
  const authorPaperInsertQuery = `
    INSERT INTO Author_Papers (author_id, paper_id) VALUES
        (1, 1),
        (1, 4),
        (2, 3),
        (2, 6),
        (3, 5),
        (3, 8),
        (4, 7),
        (4, 15),
        (5, 10),
        (5, 27),
        (6, 25),
        (6, 23),
        (7, 13),
        (7, 14),
        (8, 30),
        (8, 16),
        (9, 18),
        (9, 28),
        (10, 9),
        (10, 29),
        (11, 2),
        (11, 21),
        (12, 11),
        (12, 24),
        (13, 17),
        (13, 26),
        (14, 12),
        (14, 20),
        (15, 22),
        (15, 19);
    `;

  // Create Research_Papers table
  connection.query(createResearchPapersTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Research_Papers table created.");

    // Create Author_Papers table
    connection.query(createAuthorPapersTableQuery, (err, result) => {
      if (err) throw err;
      console.log("Author_Papers table created.");

      // Insert data into Authors table
      connection.query(insertAuthorsQuery, (err, result) => {
        if (err) throw err;
        console.log("Data inserted into Authors table.");

        // Insert data into Research_Papers table
        connection.query(insertResearchPapersQuery, (err, result) => {
          if (err) throw err;
          console.log("Data inserted into Research_Papers table.");

          // Insert data into Research_Papers table
          connection.query(authorPaperInsertQuery, (err, result) => {
            if (err) throw err;
            console.log("Data inserted into Author_Papers table.");

            // Close the connection
            connection.end();
          });
        });
      });
    });
  });
});
