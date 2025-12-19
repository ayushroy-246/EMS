import React from 'react'

const Tasks = (props) => {
    let taskList = props.tasks;
    async function compTask(task_name)
    {
        let reqBody = {task_name : task_name}
          let r = await fetch("http://localhost:3000/user/comptask", {method:"POST", headers: {
                   "Content-Type": "application/json"}, body: JSON.stringify(reqBody)});
          let response = await r.json(); 
          if(response.message === "S")
          {
            alert("Task marked as Completed.");
            props.getTasks(props.user.username);
          }
    }
    return (
    <div>
      <h2>Your Tasks</h2>
      <table border="1">
        <thead>
            <tr>
            <th>S. No.</th>
            <th>Task</th>
            <th>Status</th>
            <th>Manage Task</th>
            </tr>
        </thead>
        <tbody>
            {taskList.map((task, index)=> (
              <tr key = {index}>
                <td>{index + 1}</td>
                <td>{task.task_name}</td>
                <td>{task.status}</td>
                <td>
                {task.status === "Pending" ? (
                 <button onClick={() => compTask(task.task_name)}>Mark as Completed</button>
                    ) : (
                      null
                       )}
                </td>

              </tr>  
            ))}
       </tbody> 
      </table>  
      <br/>
      <button onClick={()=>{props.setWork("d")}}>Go to Dashboard</button>
    </div>
  )
}

export default Tasks
