import express from "express";
import pg from 'pg';
import cors from 'cors';

const PORT = 8081;
const app = express();
app.use(cors());
app.use(express.json());

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'lanware',
  password: 'hp15',
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside Server" });
    return res.json(result.rows); 
  });
});



// create
app.post('/student', (req, res) => {
  const sqlInsert = "INSERT INTO students (name, email) VALUES ($1, $2)";
  const sqlResetSequence = "ALTER SEQUENCE students_id_seq RESTART WITH 1"; // Adjust the sequence name if needed

  const values = [
    req.body.name,
    req.body.email
  ];

  db.query(sqlInsert, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Reset the sequence after successful insertion
    db.query(sqlResetSequence, (resetErr, resetResult) => {
      if (resetErr) {
        console.error(resetErr);
        return res.status(500).json({ Message: "Error resetting sequence" });
      }

      return res.status(201).json(result);
    });
  });
});



//read
app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM students WHERE id = $1";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside Server" });
    return res.json(result.rows);
  });
});


// update
app.put("/edit/:id", (req, res) => {
  const sql = "UPDATE students SET name=$1, email=$2 WHERE id=$3";
  const id = req.params.id;
  db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Internal Server Error" });
    }
    return res.json(result);
  });
});

// delete
app.delete('/delete/:id', (req, res) => {
  const sqlDelete = "DELETE FROM students WHERE id=$1";
  const sqlResetSequence = "ALTER SEQUENCE students_id_seq RESTART WITH 1"; // Adjust the sequence name if needed
  const id = req.params.id;

  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Internal Server Error" });
    }

    // Reset the sequence after successful deletion
    db.query(sqlResetSequence, (resetErr, resetResult) => {
      if (resetErr) {
        console.error(resetErr);
        return res.status(500).json({ Message: "Error resetting sequence" });
      }

      return res.json(result);
    });
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
