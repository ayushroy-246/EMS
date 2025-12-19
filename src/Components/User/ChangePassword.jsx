import {useForm} from "react-hook-form"

const ChangePassword = (props) => {
    
        const {
        register,
        handleSubmit,
        watch,
        formState : {errors}
        } = useForm() 

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

        async function afterSubmit(data)
        {
            if(data.password !== data.c_password)
                alert("Password and Confirm Password do not match.");
            else
            {
                if(isValidPass(data.password))
                {
                    let reqBody = {username: props.user.username, password: data.password};
                    let r = await fetch("http://localhost:3000/user/cp", {method:"POST", headers: {
                   "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
                   let response = await r.json(); 
                   if(response.message === "S")
                    alert("Password changed successfully.");
                }
                else
                alert("Not a valid password.");
            }
        }

        return(
            <div>
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit(afterSubmit)}>
                 <div>
                 <label>Set New Password:</label>
                 <input type = "password" {...register("password", {
                  required:{value:true, message:"This is a required field."}, 
                 })}/>
                 </div>
                 
                 <div>
                 <label>Confirm (New) Password:</label>
                 <input type = "password" {...register("c_password", {
                  required:{value:true, message:"This is a required field."}, 
                  })}/>
                 </div> <br/>
                 <input type = "submit" />
                </form> <br/><br/>
                <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
            </div>
        )
    }
        
    export default ChangePassword