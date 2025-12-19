import { useState } from 'react'
import {useForm} from "react-hook-form"

const Login = (props) => {
    
        const {
        register,
        handleSubmit,
        watch,
        formState : {errors}
        } = useForm()

        let URL;
        if(props.type === "A")
            URL = "http://localhost:3000/admin/login"
        else
            URL = "http://localhost:3000/user/login"
        
        async function afterSubmit(data)
        {
            let r = await fetch(URL, {method:"POST", headers: {
            "Content-Type": "application/json"}, body: JSON.stringify(data)});
            let response = await r.json();
            if(response.message === "S")
            {
                props.setUser(response);
                props.setAct("LoggedIn");
            }
            else if(response.message === "WP")
                alert("Wrong Password.");
            else if(response.message === "WU")
                alert("No user with the provided Username exists.");
        }
        
        /*function afterSubmit(data)
        {
        if(localStorage.getItem(data.username) == null)
            alert("Invalid username.");
        else
        {
            let user = JSON.parse(localStorage.getItem(data.username))
            if(data.password === user.password)
                {
                    props.setUser(user);
                    props.setAct("LoggedIn");
                }
            else
                alert("Invalid password.");
        }
        }*/
    
        

        
   
return(
    <div>
        <h2>Welcome!</h2>
        <form onSubmit={handleSubmit(afterSubmit)}>
        <div>
            <label>Username:</label>
            <input type = "text" placeholder="Employee ID" {...register("username", { 
                required:{value:true, message:"'Username' is a required field."},
                })}/>
        {errors.username && <p style={{color:"red"}}>{errors.username.message}</p>}
        </div>
        <div>
            <label>Password:</label>
            <input type = "password" {...register("password", {
                required:{value:true, message:"'Password' is a required field."}, 
        })}/>
        {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
        </div>
        <br/>
        <input type = "submit"/>
        </form>
    </div>
   )
    
        

}

export default Login
//minLength:{value:2, message:"Username should have at least 2 characters."},
//maxLength:{value:10, message:"Username can have at most 10 characters."}
  