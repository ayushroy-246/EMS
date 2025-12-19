import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mysql from "mysql2"
import user from './routes/user.js'
import admin from './routes/admin.js'

const app = express();
const port = 3000;

/*const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "Ayush2006@",
    database: "Users",
    timezone: "Z",
    dateStrings: true 
});*/

app.use(cors());
app.use(bodyParser.json());
app.use('/user', user);
app.use('/admin', admin);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/*app.post('/signup', (req,res) => {
   const User = req.body;
   const queryCheck = 'SELECT * FROM Credentials WHERE username = ?';
   connection.query(queryCheck, [User.username], (error, results) =>{
    if(results.length != 0)
      res.json({message: "E"});
   });
   const queryIn = 'INSERT INTO Credentials VALUES (?, ?, ?)';
   connection.query(queryIn, [User.name, User.username, User.password], (error, results) =>{
    if (error) {
          console.error('Error inserting user into the database: ' + error.stack);
          return res.status(500).json({ error: 'Failed to insert user' });
      }
    res.json({message: "S"});
   }); 
}
)*/



app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})

