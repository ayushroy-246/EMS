import React from 'react'
import {useForm} from "react-hook-form"


const NewEmp = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState : {errors}
        } = useForm()

    async function afterSubmit(data)
    {
        let r = await fetch("http://localhost:3000/admin/addemp", {method:"POST", headers: {
            "Content-Type": "application/json"}, body: JSON.stringify(data)});
        let response = await r.json();
        if(response.message === "S")
            alert("Employee added successfully.");
    }
  
    return (
    <div>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit(afterSubmit)}>
        <div>
            <label>Name:</label>
            <input type = "text" {...register("name", { 
                required:{value:true, message:"This is a required field."},
                })}/>
        {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
        </div>
        <div>
            <label>Employee ID: </label>
            <input type = "text" {...register("username", { 
                required:{value:true, message:"This is a required field."},
                })}/>
        {errors.username && <p style={{color:"red"}}>{errors.username.message}</p>}
        </div>
        <div>
            <label>Email ID: </label>
            <input type = "text" {...register("email_id", { 
                required:{value:true, message:"This is a required field."},
                })}/>
        {errors.email_id && <p style={{color:"red"}}>{errors.email_id.message}</p>}
        </div>
        <div>
            <label>Department: </label>
            <input type = "text" {...register("dept", { 
                required:{value:true, message:"This is a required field."},
                })}/>
        {errors.dept && <p style={{color:"red"}}>{errors.dept.message}</p>}
        </div>
        <div>
            <label>Position: </label>
            <input type = "text" {...register("post", { 
                required:{value:true, message:"This is a required field."},
                })}/>
        {errors.post && <p style={{color:"red"}}>{errors.post.message}</p>}
        </div>
        <input type = "submit" />
        </form>
        <br/><br/>
        <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
  )
}

export default NewEmp
