import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 8081
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME
});


app.get('/login/:id', (req, res) => {
        const userId = req.params.id;
        const sql = "SELECT * FROM login WHERE id = ?";
        
        db.query(sql, [userId], (err, data) => {
          if (err) {
            return res.json({ error: "Error fetching user data from server" });
          }
          
          if (data.length > 0) {
            const user = data[0];
            return res.json({ success: true, user });
          } else {
            return res.json({ success: false, message: "User not found" });
          }
        });
      });
      







app.get('/login', (req, res) => {
        const sql = "SELECT * FROM login"; // Fetch all users' data
      
        db.query(sql, (err, data) => {
          if (err) {
            return res.json({ error: "Error fetching users' data from server" });
          }
          return res.json({ success: true, usersData: data });
        });
      });
    




app.post("/register", (req, res) => {
  const sql = "INSERT INTO LOGIN ( `name`,`type`,`position`,`email`,`id`,`password`) VALUES (?)";

  const values = [
        req.body.name,
        req.body.type,
        req.body.position,
        req.body.email,
        req.body.password,
        req.body.id,
]
db.query(sql,[values],(err, result) =>{
        if(err) 
                return res.json({Error : "Inserting data Error in server"});

        return res.json({Status: "success"});

})
;
});





app.post('/login', (req, res) => {
        const sql = "SELECT * FROM login WHERE id = ? AND password = ?";
    
        db.query(sql, [req.body.id, req.body.password], (err, data) => {
            if (err) {
                return res.json({ error: "Login error in server" });
            }
    
            if (data.length > 0) {
                return res.json({ success: true });  
            } else {
                return res.json({ success: false, message: "Invalid credentials" });
            }
        });
    });
    



app.listen(PORT, () => {
  console.log("Server is Running");
});
