import React from 'react'
import {useForm} from "react-hook-form"

const ChangeProfile = (props) => {
  
    const {
            register,
            handleSubmit,
            watch,
            formState : {errors}
            } = useForm()
    
    async function afterSubmit(data)
    {
        let n_pr = parseFloat(data.n_pr);
        //if(n_pr > 5.0)
        let reqBody = {emp_id: props.emp.emp_id, n_dept: data.n_dept, n_post: data.n_post, n_pr: n_pr};
        let r = await fetch("http://localhost:3000/admin/changeprofile", {method:"POST", headers: {
                   "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
          let response = await r.json(); 
          if(response.message === "S")
          alert("Changes applied successfully.");
    }

    return (
    <div>
      <h2>Modify details</h2>
      Employee ID : {props.emp.emp_id} <br/>
      Name : {props.emp.name}  <br/>
      <form onSubmit={handleSubmit(afterSubmit)}>
                 <div>
                 <label>Department: </label>
                 <input type = "text" defaultValue={props.emp.dept} {...register("n_dept", {
                  required:{value:true, message:"This is a required field."}, 
                 })}/>
                 </div>
                 <div>
                 <label>Position: </label>
                 <input type = "text" defaultValue={props.emp.post} {...register("n_post", {
                  required:{value:true, message:"This is a required field."}, 
                 })}/>
                 </div>
                 <div>
                 <label>Performance Rating: </label>
                 <input type = "text" defaultValue={props.emp.pr} {...register("n_pr", {
                  required:{value:true, message:"This is a required field."}, 
                  maxLength:{value:3, message:"Performance rating can have one digit after decimal point, eg.: 4.5"}
                 })}/>
                 </div>
                 <input type = "submit" />
        </form> <br/><br/>
        <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
  )
}

export default ChangeProfile
