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
   const query = 'SELECT * FROM Admins WHERE username = ?'
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

router.post('/addemp', (req,res) => {
  const reqBody = req.body;
  const query1 = 'INSERT INTO UserCredentials VALUES (?,"User@123",?)'
  const query2 = 'INSERT INTO UserDetails (name, email_id, emp_id, dept, post, leaves) VALUES (?,?,?,?,?,15)'
  connection.query(query1, [reqBody.name, reqBody.username], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while adding employee.' });
      }})
  connection.query(query2, [reqBody.name,reqBody.email_id, reqBody.username, reqBody.dept, reqBody.post], 
  (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while adding employee.' });
      }})
    res.json({message : "S"});
})

router.get('/allProfiles', (req,res) => {
  const query = 'SELECT * FROM UserDetails';
  connection.query(query, (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while fetching details.' });
      }
    res.json(results);
})
})

router.post('/changeprofile', (req,res) => {
  const reqBody = req.body;
  const query = 'UPDATE UserDetails SET dept = ?, post = ?, pr = ? WHERE emp_id = ?';
   connection.query(query, [reqBody.n_dept, reqBody.n_post, reqBody.n_pr, reqBody.emp_id], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while modifying details.' });
      }
    
      res.json({message:"S"});
})
})

router.post('/getProfile', (req,res) => {
  const reqBody = req.body;
  const query = 'SELECT * FROM UserDetails WHERE emp_id = ?';
  connection.query(query, [reqBody.emp_id], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while fetching details.' });
      }
    res.json(results[0]);
})
})



router.get('/showtasks', (req,res) => {
  const query = 'SELECT * FROM Tasks ORDER BY status DESC';
   connection.query(query, (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while fetching tasks.' });
      }
    
    res.json(results);
})
})

router.post('/addTask', (req,res) => {
  const reqBody = req.body;
  const query = 'INSERT INTO Tasks VALUES (?, ?, "Pending")'
   connection.query(query, [reqBody.emp_id, reqBody.task_name], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while modifying tasks.' });
      }
    
    res.json({message: "S"});
})
})

router.get('/viewleaves', (req,res) => {
  const query = 'SELECT * FROM Leaves ORDER BY status, from_date';
   connection.query(query, (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while fetching leave details' });
      }
    
    res.json(results);
})
})

router.post('/approveLeave', (req,res) => {
  const reqBody = req.body;
  const query1 = 'UPDATE Leaves SET status = "Approved" WHERE emp_id=? AND from_date=? AND to_date=?';
  const query2 = 'SELECT * FROM UserDetails WHERE emp_id = ? ';
  const query3 = 'UPDATE UserDetails SET leaves = ? WHERE emp_id = ?';

  connection.query(query1, [reqBody.emp_id, reqBody.from_date, reqBody.to_date], (error, results) =>{
    if (error) {
      console.error('An error occured : ' + error.stack);
      return res.status(500).json({ error: 'Error while approving leave.' });
    }

    connection.query(query2, [reqBody.emp_id], (error, results) =>{
      if (error) {
        console.error('An error occured : ' + error.stack);
        return res.status(500).json({ error: 'Error while fetching employee.' });
      }
      
      const left = results[0].leaves;
      const newLeaves = left - reqBody.number;

      connection.query(query3, [newLeaves, reqBody.emp_id], (error, results) =>{
        if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while updating leave.' });
        }
        
        res.json({message : "S"});
      });
    });
  });
});

router.post('/rejectLeave', (req,res) => {
  const reqBody = req.body;
  const query1 = 'UPDATE Leaves SET status = "Rejected" WHERE emp_id=? AND from_date=? AND to_date=?';
   connection.query(query1, [reqBody.emp_id, reqBody.from_date, reqBody.to_date], (error, results) =>{
    if (error) {
          console.error('An error occured : ' + error.stack);
          return res.status(500).json({ error: 'Error while rejecting leave.' });
      }
      res.json({message : "S"});
  })
})

//module.exports = router
export default router