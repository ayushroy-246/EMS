import React, { useState } from 'react'
import Profile_all from './Profile_all';
import Profile_one from './Profile_one';

const Profile_A = (props) => {
    const [act, setAct] = useState("");  
    const [profiles, setProfiles] = useState([]);
  
    async function getProfiles()
    {
        let r = await fetch("http://localhost:3000/admin/allProfiles");
        let response = await r.json();
        setProfiles(response);
        setAct("A");
    }
    
    if(act === "")
    {
    return (
    <div>
      <button onClick={()=>getProfiles()}>View details of all Employees</button>
      <br/>
      <button onClick={()=>setAct("O")}>Search employee by Employee ID</button>
      <br/><br/>
      <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
   )
  }
  else if(act === "A")
    {
        return(
            <Profile_all profiles = {profiles} setAct = {setAct} setWork = {props.setWork} />
        )
    }
  else
  {
    return(
        <Profile_one setAct = {setAct} setWork = {props.setWork} />
    )
  }
}

export default Profile_A
