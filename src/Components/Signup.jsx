import React from 'react'
import { useState } from 'react'
import {useForm} from "react-hook-form"

const Signup = (props) => {
    const {
    register,
    handleSubmit,
    watch,
    formState : {errors}
    } = useForm();

    function isValidPass(pass)
    {
        let lower=0, upper=0, digit=0, spl=0;
        let c;
        for(let i=0; i<pass.length; i++)
        {
            c = pass.charCodeAt(i);
            if(c>=65 && c<=90)
                upper++;
            else if(c>=97 && c<=122)
                lower++;
            else if(c>=48 && c<=57)
                digit++; 
            else
                spl++;
        }
        if(lower>0 && upper>0 && digit>0 && spl>0)
            return true;
        else
            return false;
    }
    
    async function afterSubmit(data){
        if(isValidPass(data.password))
        {
           let r = await fetch("http://localhost:3000/signup", {method:"POST", headers: {
           "Content-Type": "application/json"}, body: JSON.stringify(data)});
           let response = await r.json(); 
           if(response.message === "E")
            alert("User already exists.");
           else if(response.message === "S")
            alert("Signup successful! You may now proceed to login.");
        }
        else
        {
            alert("Invalid password!");
        }
    }
    /*function afterSubmit(data){
        if((localStorage.getItem(data.username)) !== null)
            alert("You are an existing user.");
        else
        {
           if(isValidPass(data.password))
           {
            localStorage.setItem(data.username, JSON.stringify(data));
            alert("Signup successful! You may now proceed to login.");
           }
           else
            alert("Invalid password.");
        }
}*/

    
    return (
    <div>
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit(afterSubmit)} >
        <div>
            <label>Name:  </label>
            <input {...register("name", {
                required:{value:true, message:"'Name' is a required field."} 
        })}/>
        {errors.name && <p style={{color:"red"}}>{errors.name.message}</p>}
        </div>
        <div>
            <label>Email ID:</label>
            <input type = "email" {...register("username", { 
                required:{value:true, message:"'Email ID' is a required field."},
                })}/>
        {errors.username && <p style={{color:"red"}}>{errors.username.message}</p>}
        </div>
        <div>
            <label>Set Password:</label>
            <input type = "password" {...register("password", {
                required:{value:true, message:"'Password' is a required field."}, 
                minLength:{value:8, message:"Password should have at least 8 characters."}, 
                maxLength:{value:16, message:"Password can have at most 16 characters."}
        })}/>
        {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}
        </div>
        <br/>
        <input type = "submit" />
        </form>
        
        <pre>
            <ul style={{textAlign:"left"}}>
                <li>Email Id will be used as Username.</li>
                <br/>
                <li>Password can have 8 to 16 characters.
                    It should contain at least 1 uppercase letter, 1 lowercase letter,
                    1 digit and 1 special character. </li>
            </ul>
        </pre>

        <button onClick = {()=>{props.setAct("Login")}}>Go to Login page</button>
   </div>
  )
}

export default Signup
