let exp = require("express");
let mysql = require("mysql2");
let cors = require("cors");
let app = exp();
app.use(cors());
app.use(exp.json());

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shreya",
  database: "studentschema",
});

con.connect(function (err) {
  if (!err) console.log("DB connected successfully");
  else console.log("DB connection failed");
});

app.listen(9000, function () {
  console.log("Server Online");
});

app.get('/getinfo/:id', function (req, res) {
  let studentID = req.params.id;
  con.query(
    "SELECT studId, fullName, Address, email, mobile FROM studentinfo WHERE studId = ?",
    [studentID],
    function (err, result) {
      if (err) {
        console.error("SQL Error:", err);
        res.json({ error: "Internal server error" });
      } else if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.json({ error: "Student ID not found" });  
      }
    }
  );
});

app.all("*", function (req, res) {
  res.send("Wrong URL"); 
});