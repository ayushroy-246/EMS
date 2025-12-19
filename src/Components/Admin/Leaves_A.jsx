import React from 'react'

const Leaves_A = (props) => {
    const Leavelist = props.leaves;
  
    async function approveLeave(emp_id, from_date, to_date)
    {
      const reqBody = {emp_id: emp_id, from_date: from_date, to_date: to_date,
        number: Math.round((new Date(to_date) - new Date(from_date))/(1000 * 60 * 60 * 24))+1 };
      let r = await fetch("http://localhost:3000/admin/approveLeave", {method:"POST", headers: {
            "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
        let response = await r.json();
        if(response.message === "S")
        {
            alert("Leave approved.");
            props.getLeaves();
        }
    }

    async function rejectLeave(emp_id, from_date, to_date)
    {
      const reqBody = {emp_id: emp_id, from_date: from_date, to_date: to_date};
      let r = await fetch("http://localhost:3000/admin/rejectLeave", {method:"POST", headers: {
            "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
        let response = await r.json();
        if(response.message === "S")
        {
            alert("Leave request rejected.");
            props.getLeaves();
        }
    }
    
    return (
    <div>
      <h2>Leave Requests</h2>
      <table border="1">
        <thead>
            <tr>
            <th>Employee ID</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>No. of days</th>
            <th>Status</th>
            <th>Manage Leave Request</th>
            </tr>
        </thead>
        <tbody>
            {Leavelist.map((leave, index)=> (
              <tr key = {index}>
                <td>{leave.emp_id}</td>
                <td>{leave.from_date}</td>
                <td>{leave.to_date}</td>
                <td>{Math.round((new Date(leave.to_date) - new Date(leave.from_date))/(1000 * 60 * 60 * 24))+1}</td>
                <td>{leave.status}</td>
                <td>
                {leave.status === "Applied" ? (<div>
                <button onClick={()=>{approveLeave(leave.emp_id, leave.from_date, leave.to_date)}}>
                        Approve</button>
                <button onClick={()=>{rejectLeave(leave.emp_id, leave.from_date, leave.to_date)}}>
                        Reject</button> </div>) : (null) }
                </td>
              </tr>  
            ))}
       </tbody> 
      </table>
      <br/><br/>
      <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
  )
}

export default Leaves_A
