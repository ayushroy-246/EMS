import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import ChangeProfile from './ChangeProfile';

const Profile_one = (props) => {
    const [found, setFound] = useState(false);
    const [emp, setEmp] = useState(null);
    const [act, setAct] = useState("V");
    
    const {register,
            handleSubmit,
            watch,
            formState : {errors}
            } = useForm()

    async function afterSubmit(data)
    {
        let r = await fetch("http://localhost:3000/admin/getProfile", {method:"POST", headers: {
            "Content-Type": "application/json"}, body: JSON.stringify(data)});
        let response = await r.json();
        setEmp(response);
        setFound(true);
    }
    
    if(act === "M")
    {
        return <ChangeProfile emp = {emp} setWork = {props.setWork} />
    }
    else
    {
    if(found)
        {
        return(<div>
                Name : {emp.name} <br/>
                Employee ID : {emp.emp_id} <br/>
                Department: {emp.dept} <br/>
                Post : {emp.post} <br/>
                Performance Rating : {emp.pr} <br/> <br/>
                Email ID : {emp.email_id} <br/>
                Phone Number : {emp.phone} <br/>
                Address : {emp.address} <br/> <br/>
                <button onClick={()=>{setAct("M")}}>Modify Profile</button> <br/><br/>
                <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
                </div>
            )
        }        
    
        else{
    return (
    <div>
      <form onSubmit={handleSubmit(afterSubmit)}>
                 <div>
                 <label>Employee ID: </label>
                 <input type = "text" {...register("emp_id", {
                  required:{value:true, message:"This is a required field."}, 
                 })}/>
                 </div>
                 <input type = "submit" />
        </form>
    </div>
  )
}
    }
}

export default Profile_one
