const { urlencoded } = require("express");
const express = require("express");
const mysql2 = require("mysql2");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql2.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Password",
    database: "movies_db",
  },
  console.log("successfully connected to movies_db")
);

app.get("/api/movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    if (err) {
      console.error(err);
    }
    res.json(result);
  });
});

app.get("/api/movie-reviews", (req, res) => {
  db.query(
    "SELECT * FROM reviews JOIN movies ON movies.id = reviews.movie_id",
    (err, result) => {
      if (err) {
        console.error(err);
      }
      res.json(result);
    }
  );
});

app.post("/api/add-movie", (req, res) => {
  var movieName = req.body.movie;
  console.log(movieName);
  db.query(
    "INSERT INTO movies (movie_name) VALUES (?)",
    movieName,
    (err, result) => {
      if (err) {
        console.error(err);
      }
      console.log(result);
      res.json(result);
    }
  );
});

app.put("/api/review/:id", (req, res) => {
  var reviewText = req.body.text;
  var reviewId = req.params.id;
  db.query(
    "UPDATE reviews SET review=? WHERE id=?",
    [reviewText, reviewId],
    (err, result) => {
      if (err) {
        console.error(err);
      }
      console.log(result);
      res.json(result);
    }
  );
});

app.delete("/api/movie/:id", (req, res) => {
  var movieID = req.params.id;
  db.query("DELETE FROM movies WHERE id=?", movieID, (err, result) => {
    if (err) {
      console.error(err);
    }
    console.log("delete successful");
    res.json(result);
  });
});

app.listen(PORT, () => console.log("app listening at http://localhost:3001"));
