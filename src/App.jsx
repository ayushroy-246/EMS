import { useState } from 'react'
import './App.css'
import Login from './Components/Login'
import AfterLogin_U from './Components/User/AfterLogin_U'
import AfterLogin_A from './Components/Admin/AfterLogin_A'


function App() {
  
  const [type, setType] = useState("");
  const [activity, setAct] = useState("Login");
  const [user, setUser] = useState(null);
  
if(type === "")
{
  return(
    <div>
      <h2>Welcome!</h2>
      <button onClick={()=>{setType("U")}}>Employee Login </button>
      <br/><br/>
      <button onClick={()=>{setType("A")}}>Admin Login </button>
    </div>
  )
}
else if(type === "A")
  {
    if(activity === "Login" || activity === "LoggedOut")
    return(<div> <Login type = {type} user = {user} setUser = {setUser} setAct={setAct} /> </div> )
    else
    return(<div> <AfterLogin_A  user = {user} setUser = {setUser} setType = {setType} setAct={setAct}/> </div> )

  }
else
{
  if(activity === "Login" || activity === "LoggedOut")
    return(<div> <Login type = {type} user = {user} setUser = {setUser} setAct={setAct} /> </div> )
    else
    return(<div> <AfterLogin_U user = {user} setUser = {setUser} setType = {setType} setAct={setAct}/> </div> )
} 

}

export default App;