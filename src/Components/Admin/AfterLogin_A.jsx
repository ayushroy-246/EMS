import { useState } from 'react'
import NewEmp from './NewEmp';
import Profile_A from './Profile_A';
import Tasks_A from './Tasks_A';
import Leaves_A from './Leaves_A';

const AfterLogin_A = (props) => {
    const [work, setWork] = useState("d");
    const [leaves, setLeaves] = useState([]);
    
    function afterLogout()
    {
        props.setUser(null);
        props.setAct("LoggedOut");
        props.setType("");
    }
    
    async function getLeaves()
    {
      let r = await fetch("http://localhost:3000/admin/viewleaves");
      let response = await r.json();
      setLeaves(response);
      setWork("l");
    }
    
    if(work === "a")
    {
      return(
        <NewEmp setWork = {setWork} />
      )
    }
    else if(work === "p")
    {
      return(
        <Profile_A setWork = {setWork} />
      )
    }
    else if(work === "t")
    {
      return(
        <Tasks_A setWork = {setWork} />
      )
    }
    else if(work === "l")
    {
      return(
        <Leaves_A leaves = {leaves} getLeaves = {getLeaves} setWork = {setWork} />
      )
    }
    else
    {
    return (
    <div>
      <h2>Hello {props.user.name} </h2>
      <br/>
      <button onClick = {()=>{setWork("a")}}>Add New Employee</button>
      <button onClick = {()=>{setWork("p")}}>View/Modify Employee Details</button>
      <button onClick = {()=>{setWork("t")}}>View/Add Tasks</button>
      <button onClick = {()=>{getLeaves()}}>View/Manage Leave Requests</button>
      <br/> <br/>
      <button onClick={()=>{afterLogout()}}>Logout</button>      
            
    </div>
  )
}
}

export default AfterLogin_A