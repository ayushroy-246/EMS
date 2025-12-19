import { useState } from "react"
import AddTask from "./AddTask";

const Tasks_A = (props) => {
    const [act, setAct] = useState("");
    const [tasks, setTasks] = useState([]);
    
    async function getTasks()
    {
      let r = await fetch("http://localhost:3000/admin/showtasks");
      let response = await r.json();
      setTasks(response);
      setAct("V"); 
    }

if(act === "")
{
   return (
    <div>
      <button onClick={()=>{getTasks()}}>View Status of Tasks</button>
      <button onClick={()=>{setAct("A")}}>Assign Task</button> <br/><br/>
      <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
  )
}

else if (act === "A")
{
    return(<AddTask setWork = {props.setWork} /> )
}

else
{
    return(
        <div>
      <h2>Tasks</h2>
      <table border="1">
        <thead>
            <tr>
            <th>Employee ID</th>
            <th>Task</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {tasks.map((task, index)=> (
              <tr key = {index}>
                <td>{task.emp_id}</td>
                <td>{task.task_name}</td>
                <td>{task.status}</td>
              </tr>  
            ))}
       </tbody> 
      </table>  
      <br/>
      <br/>
      <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
    )
}

}

export default Tasks_A
