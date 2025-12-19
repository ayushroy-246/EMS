import React, { useState } from 'react'
import ApplyLeave from './ApplyLeave';

const Leaves = (props) => {
    const [act, setAct] = useState("");
    const [leaves, setLeaves] = useState([]);

    async function viewLeave(username)
    {
        let reqBody = {username : username};
        let r = await fetch("http://localhost:3000/user/viewleave", {method:"POST", headers: {
                   "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
        let response = await r.json(); 
        setLeaves(response);
        setAct("V");
    }
    
   if(act === "")
   {
    return(
      <div>
        <button onClick={()=>{viewLeave(props.details.emp_id)}}>View Leave Status</button>
        <button onClick={()=>{setAct("A")}}>Apply for Leave</button>
      </div>
    )
   }
   
   else if(act === "A")
   {
      return(
      <ApplyLeave details = {props.details} setAct = {setAct} setWork = {props.setWork} viewLeave = {viewLeave}/>
      )
   }
   
   else
   {
    return(
    <div>
      <h4>No. of leaves left : {props.details.leaves}</h4>
      <table border="1">
        <thead>
            <tr>
            <th>From</th>
            <th>To</th>
            <th>No. of days</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {leaves.map((leave, index)=> (
              <tr key = {index}>
                <td>{leave.from_date.split('T')[0]}</td>
                <td>{leave.to_date.split('T')[0]}</td>
                <td>{Math.round((new Date(leave.to_date) - new Date(leave.from_date))/(1000 * 60 * 60 * 24))+1}</td>
                <td>{leave.status}</td>
              </tr>  
            ))}
       </tbody> 
      </table>  
      <br/>
      <button onClick={()=>{setAct("A")}}>Apply Leave</button>
      <br/><br/>
      <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
    )
   }
}

export default Leaves
