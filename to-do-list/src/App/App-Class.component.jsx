import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

import { NewTask } from '../../src/NewTask/New-Task.component';
import { AddTask } from '../../src/AddTask/Add-Task.component';
import { ToDoList } from '../../src/ToDo-List/ToDo-List.component';
import { DoneList } from '../../src/Done-List/Done-List.component';

class AppClass extends Component {

  constructor() {
    super();

    this.state = {
      todo: [],
      shownewentry: false
    };
    // this.AddNewTask = this.AddNewTask.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    fetch('http://localhost:9010/tasks')
      .then(response => response.json())
      .then(items => this.setState({ todo: items }));
  }


  AddNewTask = (taskdetails, taskdueby) => {
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
        this.setState(prevState =>
          ({ todo: [...prevState.todo, ...postedData], shownewentry: false }));
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  };

  DeleteTask = (taskdetails, taskdueby) => {
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
        this.setState(prevState => ({
          todo: [...prevState.todo.filter(todoitem =>
            !(todoitem.id === deletetaskdata.id)
          )], shownewentry: false
        }));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  UpdateTask = (taskdetails, taskdueby, completed) => {
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
        this.setState(prevState => ({
          todo: [...prevState.todo.map(todoitem =>
            todoitem.id === updatetaskdata.id ? updatetaskdata : todoitem
          )], shownewentry: false
        }));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  render() {
    console.log(this.myRef);
    const { todo } = this.state;
    const completedtasks = todo.filter(todoitem =>
      todoitem.completed === true);
    const pendingtasks = todo.filter(todoitem =>
      todoitem.completed !== true);
    return (
      <div>
        <div>
        <h1>Class component</h1>
          <h2>Pending Tasks</h2>
          <div className='App-header'>
            {
              this.state.shownewentry === true ?
                <AddTask 
                  handleClickAdd={(taskdetails, taskdueby) => this.AddNewTask(taskdetails, taskdueby)}
                  handleClickCancel={(e) => this.setState({ shownewentry: false })} /> :
                <div>
                  <ToDoList
                    todo={pendingtasks}
                    handleDeleteTask={(taskdetails, taskdueby) =>
                      this.DeleteTask(taskdetails, taskdueby)}
                    handleUpdateTask={(taskdetails, taskdueby, completed) =>
                      this.UpdateTask(taskdetails, taskdueby, completed)}
                  />
                  <NewTask
                    handleClickNew={(e) => this.setState({ shownewentry: true })}
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
                  this.DeleteTask(taskdetails, taskdueby)}
                handleUpdateTask={(taskdetails, taskdueby, completed) =>
                  this.UpdateTask(taskdetails, taskdueby, completed)}
              //  handleEditTask=
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default AppClass;
