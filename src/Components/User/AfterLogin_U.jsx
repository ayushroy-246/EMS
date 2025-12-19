import { useState } from 'react'
import ChangePassword from './ChangePassword';
import Profile from './Profile';
import Tasks from './Tasks';
import Leaves from './Leaves';

const AfterLogin_U = (props) => {
    const [work, setWork] = useState("d");
    const [details, setDetails] = useState(null);
    const [tasks, setTasks] = useState([]);
    
    function afterLogout()
    {
        props.setUser(null);
        props.setAct("LoggedOut");
        props.setType("");
    }
    
    async function getProfile(username)
    {
      let reqBody = {username: username};
      let r = await fetch("http://localhost:3000/user/vp", {method:"POST", headers: {
                           "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
      let response = await r.json();
      setDetails(response);
      setWork("vp");
    }
   

    async function getLeaves(username)
    {
      let reqBody = {username: username};
      let r = await fetch("http://localhost:3000/user/vp", {method:"POST", headers: {
                           "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
      let response = await r.json();
      setDetails(response);
      setWork("l");
    }
    
    async function getTasks(username)
    {
      let reqBody = {username: username};
      let r = await fetch("http://localhost:3000/user/showtask", {method:"POST", headers: {
                           "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
      let response = await r.json();
      setTasks(response);
      setWork("t"); 
    }
    
    if(work === "cp")
    {
      return(
        <ChangePassword user = {props.user} setWork = {setWork} />
      )
    }
    else if(work === "vp")
    {
      return(
        <Profile details = {details} setWork = {setWork} />
      )
    }
    else if(work === "t")
    {
      return(
        <Tasks user = {props.user} tasks = {tasks} getTasks = {getTasks} setWork = {setWork} />
      )
    }
    else if(work === "l")
    {
      return(
        <Leaves details = {details} setWork = {setWork} />
      )
    }
    else
    {
    return (
    <div>
      <h2>Hello {props.user.name} </h2>
      <br/>
      <button onClick = {()=>{setWork("cp")}}>Change Password</button>
      <button onClick = {()=>{getProfile(props.user.username)}}>View/Modify Profile</button>
      <button onClick = {()=>{getTasks(props.user.username)}}>Your Tasks</button>
      <button onClick = {()=>{getLeaves(props.user.username)}}>Leaves</button>
      <br/> <br/>
      <button onClick={()=>{afterLogout()}}>Logout</button>      
            
    </div>
  )
}
}

export default AfterLogin_U