import React, { useState } from 'react'
import {useForm} from "react-hook-form"


const AddTask = (props) => {
  const [found, setFound] = useState(false);
  const [emp, setEmp] = useState(null);
    
  const {
        register,
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

    async function afterSubmitTask(data)
    {
        let reqBody = {emp_id : emp.emp_id, task_name : data.task_name}
        let r = await fetch("http://localhost:3000/admin/addTask", {method:"POST", headers: {
            "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
        let response = await r.json();
        if(response.message === "S")
            alert("Task assigned successfully.");
    }
    
  
    if(found)
    {
        return(
            <div>
           <h2>Assign Task</h2>
           Employee ID : {emp.emp_id} <br/>
           Name : {emp.name}  <br/>
           Department : {emp.dept} <br/>
           Position : {emp.post} <br/><br/>
           <form onSubmit={handleSubmit(afterSubmitTask)}>
                 <div>
                 <label>Task Name: </label>
                 <input type = "text" {...register("task_name", {
                  required:{value:true, message:"This is a required field."}, 
                 })}/>
                 </div><br/>
                 <input type = "submit" />
           </form><br/><br/>
        <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
        )
    }
    
    else
    {
    return (
    <div>
      <h2>Assign Task</h2>
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

export default AddTask
