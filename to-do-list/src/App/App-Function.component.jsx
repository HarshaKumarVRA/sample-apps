import React, { useState,useEffect } from 'react';
// import logo from './logo.svg';
import '../App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

import { NewTask } from '../../src/NewTask/New-Task.component';
import { AddTask } from '../../src/AddTask/Add-Task.component';
import { ToDoList } from '../../src/ToDo-List/ToDo-List.component';
import { DoneList } from '../../src/Done-List/Done-List.component';

function AppFunction() {
  
  const [todofun, setTodofun] = useState([]);
  const [shownewentryfun, setShownewentryfun] = useState(false);


  useEffect(() => {
    fetch('http://localhost:9010/tasks')
      .then(response => response.json())
      .then(items => setTodofun( items ));
  },[]);


  const AddNewTask = (taskdetails, taskdueby) =>  {
    const data = {
      "id": (taskdetails + taskdueby).replace(/\s/g, ''),
      "name": taskdetails,
      "dueby": taskdueby,
      "completed": false
    };
    fetch('http://localhost:9010/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        const postedData = [data];
        // console.log(postedData);
        setTodofun(prevState => {
          return [...prevState, ...postedData]});
        setShownewentryfun(false);
        // this.setState(prevState => 
        //   ({ todofun: [...prevState.todofun, ...postedData], shownewentryfun: false }));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

const DeleteTask = (taskdetails, taskdueby) => {
    const deletetaskdata = {
      "id": (taskdetails + taskdueby).replace(/\s/g, '')
    };
    console.log(deletetaskdata.id);
    fetch('http://localhost:9010/tasks/' + deletetaskdata.id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        // const postedData = [data];
        setTodofun(prevState => {
           return [...prevState.filter(todoitem =>
            !(todoitem.id === deletetaskdata.id)
          )]
        });
        setShownewentryfun(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const UpdateTask = (taskdetails, taskdueby, completed) => {
    const updatetaskdata = {
      "id": (taskdetails + taskdueby).replace(/\s/g, ''),
      "name": taskdetails,
      "dueby": taskdueby,
      "completed": completed
    };
    fetch('http://localhost:9010/tasks/' + updatetaskdata.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatetaskdata)
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        // const postedData = [data];
        setTodofun(prevState => {
             return [...prevState.map(todoitem =>
            todoitem.id === updatetaskdata.id ? updatetaskdata : todoitem
          )]
        });
        setShownewentryfun(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


    // const { todofun } = this.state;
    const completedtasks = todofun.filter(todoitem =>
      todoitem.completed === true);
    const pendingtasks = todofun.filter(todoitem =>
      todoitem.completed !== true);
    return (
      <div>
        <div>
        <h1>Functional component</h1>
        <h2>Pending Tasks</h2>
        <div className='App-header'>
          {
            shownewentryfun === true ?
              <AddTask
                handleClickAdd={(taskdetails, taskdueby) => AddNewTask(taskdetails, taskdueby)}
                handleClickCancel={(e) => setShownewentryfun(false)} /> :
              <div>
                <ToDoList
                  todo={pendingtasks}
                  handleDeleteTask={(taskdetails, taskdueby) => 
                    DeleteTask(taskdetails, taskdueby)}
                  handleUpdateTask={(taskdetails, taskdueby, completed) => 
                    UpdateTask(taskdetails, taskdueby, completed)}
                />
                <NewTask
                  handleClickNew={(e) => setShownewentryfun(true)} 
                />
              </div>
          }
        </div>
        </div>
        <div>
        <h2>Completed Tasks</h2>
        <div className='App-header'>
          {/* <h3>Completed tasks</h3>   */}
          {
               <ToDoList
               todo={completedtasks}
               handleDeleteTask={(taskdetails, taskdueby) => 
                  DeleteTask(taskdetails, taskdueby)}
               handleUpdateTask={(taskdetails, taskdueby, completed) => 
                  UpdateTask(taskdetails, taskdueby, completed)}
              //  handleEditTask=
             />
          }
        </div>
        </div>
      </div>
    );

}

export default AppFunction;
