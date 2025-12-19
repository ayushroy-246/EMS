import React from 'react'
import { useState } from 'react'
import {useForm} from "react-hook-form"

const Profile = (props) => {
   
  const [act, setAct] = useState("V");

  const {
        register,
        handleSubmit,
        watch,
        formState : {errors}
        } = useForm() 

  
  /*async function getProfile(username)
    {
    let reqBody = {username: username};
    let r = await fetch("http://localhost:3000/user/vp", {method:"POST", headers: {
    "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
    let response = await r.json();
    details = response;
    }*/
    
    async function afterSubmit(data)
        {
          let reqBody = {username: props.details.emp_id, n_phone: data.n_phone, n_address: data.n_address}
          let r = await fetch("http://localhost:3000/user/mp", {method:"POST", headers: {
                   "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
          let response = await r.json(); 
          if(response.message === "S")
          alert("Changes applied successfully.");
        }
           
    
    if(act === "M")
      {
        return (
          <div>
            <form onSubmit={handleSubmit(afterSubmit)}>
                 <div>
                 <label>Phone No.:</label>
                 <input type = "text" defaultValue={props.details.phone} {...register("n_phone", {
                  required:{value:true, message:"This is a required field."}, 
                 })}/>
                 </div>
                 <br/><br/>
                 <div>
                 <label>Address:</label>
                 <input type = "text" defaultValue={props.details.address} {...register("n_address", {
                  required:{value:true, message:"This is a required field."}, 
                  })}/>
                 </div>
                 <br/>
                 <input type = "submit" />
                </form>
                <br/><br/>
                <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
          </div>
        )
      }      
    else
    {
    return (
    <div>
      Name : {props.details.name} <br/>
      Email ID : {props.details.email_id} <br/>
      Phone Number : {props.details.phone} <br/>
      Address : {props.details.address} <br/> <br/>
      Employee ID : {props.details.emp_id} <br/>
      Department: {props.details.dept} <br/>
      Post : {props.details.post} <br/>
      Performance Rating : {props.details.pr} <br/> 
      <br/> <br/>
      <button onClick={()=>{setAct("M")}}>Modify Profile</button>
      <br/><br/>
      <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
  )
}
}

export default Profile
