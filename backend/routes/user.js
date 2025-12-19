import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mysql from "mysql2"


const router = express.Router();

const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "Ayush2006@",
    database: "Users",
    timezone: "Z",
    dateStrings: true 
});

/*app.use(cors());
app.use(bodyParser.json());*/

router.post('/login', (req,res) => {
   const reqUser = req.body;
   const query = 'SELECT * FROM UserCredentials WHERE username = ?'
   connection.query(query, [reqUser.username], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while logging in.' });
      }

      if(results.length === 0)
      {
        res.json({message: "WU"});
      }
      else
      {
        if(reqUser.password === results[0].password)
        { 
           res.json(
          {
            name : results[0].name,
            username : results[0].username,
            message : "S"
          })
        }
        else
        {
          res.json({message : "WP"});
        }
      }
    }); 
})

router.post('/cp', (req,res) => {
  const reqBody = req.body;
  const query = 'UPDATE UserCredentials SET password = ? WHERE username = ?';
   connection.query(query, [reqBody.password, reqBody.username], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while changing password.' });
      }
      res.json({message : "S"});
})
})

router.post('/vp', (req,res) => {
  const reqBody = req.body;
  const query = 'SELECT * FROM UserDetails WHERE emp_id = ?';
   connection.query(query, [reqBody.username], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while fetching details.' });
      }
    if (results.length === 0) {
         return res.status(404).json({ error: 'User not found' });
      }
      res.json(results[0]);
})
})

router.post('/mp', (req,res) => {
  const reqBody = req.body;
  const query = 'UPDATE UserDetails SET phone = ?, address = ? WHERE emp_id = ?';
   connection.query(query, [reqBody.n_phone, reqBody.n_address, reqBody.username], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while modifying details.' });
      }
    
      res.json({message:"S"});
})
})

router.post('/showtask', (req,res) => {
  const reqBody = req.body;
  const query = 'SELECT * FROM Tasks WHERE emp_id = ? ORDER BY status DESC';
   connection.query(query, [reqBody.username], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while fetching tasks.' });
      }
    
    res.json(results);
})
})

router.post('/comptask', (req,res) => {
  const reqBody = req.body;
  const query = 'UPDATE Tasks SET status = "Completed" WHERE task_name = ?';
   connection.query(query, [reqBody.task_name], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while modifying tasks.' });
      }
    
    res.json({message: "S"});
})
})

router.post('/viewleave', (req,res) => {
  const reqBody = req.body;
  const query = 'SELECT * FROM Leaves WHERE emp_id = ? ORDER BY status, from_date';
   connection.query(query, [reqBody.username], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while fetching leave details' });
      }
    
    res.json(results);
})
})

router.post('/applyleave', (req,res) => {
  const reqBody = req.body;
  const query1 = 'INSERT INTO Leaves VALUES (?,?,?,"Applied")';
   connection.query(query1, [reqBody.username, reqBody.from_date, reqBody.to_date], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while applying for leave.' });
      }
      res.json({message : "S"});
  })
})

//module.exports = router
export default router