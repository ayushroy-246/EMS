import React, { useState } from 'react'
import {useForm} from "react-hook-form"

const ApplyLeave = (props) => {
    const left = props.details.leaves;
    const today = new Date();
    const isoToday = today.toISOString().substring(0, 10);
    const {
            register,
            handleSubmit,
            watch,
            formState : {errors}
            } = useForm() 

    const from = watch("from_date");
    const to = watch("to_date");
  
async function applyLeave(data)
  {
    let number = Math.round((new Date(data.to_date) - new Date(data.from_date))/(1000 * 60 * 60 * 24))+1;
    if(number > left)
    {
        alert(`You don't have ${number} available leaves.`);
        props.setAct("");
    }
    else
    { 
    let reqBody = {username: props.details.emp_id, from_date: data.from_date, to_date: data.to_date, 
                   left:left, number: number};
    let r = await fetch("http://localhost:3000/user/applyleave", {method:"POST", headers: {
                   "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
    let response = await r.json(); 
    if(response.message === "S")
    {
        alert("Leave applied successfully.");
        props.viewLeave(props.details.emp_id);
    }
  }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit(applyLeave)}>
        <div>
          Number of leaves left: {props.details.leaves} <br/><br/>
          <label>From Date: </label>
            <input type = "date" min = {isoToday}  {...register("from_date", {
                  required:{value:true, message:"This is a required field."}, 
            })}/>
        </div>
        <div>
          <label>To Date: </label>
            <input type = "date" min = {isoToday}  {...register("to_date", {
                  required:{value:true, message:"This is a required field."}, 
            })}/>
        </div>
        Number of days: {Math.round((new Date(to) - new Date(from))/(1000 * 60 * 60 * 24))+1} <br/><br/>
      <input type = "submit" />
      </form>
      <br/><br/>
      <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    
    </div>
  )
}

export default ApplyLeave
