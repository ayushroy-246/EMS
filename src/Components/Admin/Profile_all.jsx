import React, { useState } from 'react'
import ChangeProfile from './ChangeProfile';

const Profile_all = (props) => {
   const profiles = props.profiles;
   const[change, setChange] = useState(false);
   const[emp, setEmp] = useState(null); 

   
   function onModify(employee)
   {
    setEmp(employee);
    setChange(true);
   }
   
   if(change)
   {
    return(<ChangeProfile emp = {emp} setWork = {props.setWork} />)
   }
   else
   {
   return (
    <div>
      <table border="1">
        <thead>
            <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email ID</th>
            <th>Department</th>
            <th>Position</th>
            <th>Performance Rating</th>
            <th>Modify Details</th>
            </tr>
        </thead>
        <tbody>
            {profiles.map((profile, index)=> (
              <tr key = {index}>
                <td>{profile.emp_id}</td>
                <td>{profile.name}</td>
                <td>{profile.email_id}</td>
                <td>{profile.dept}</td>
                <td>{profile.post}</td>
                <td>{profile.pr}</td>
                <td><button onClick={()=>{onModify(profile)}}>Modify</button></td>
              </tr>  
            ))}
       </tbody> 
      </table> <br/><br/>
      <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
  )
}
}

export default Profile_all
