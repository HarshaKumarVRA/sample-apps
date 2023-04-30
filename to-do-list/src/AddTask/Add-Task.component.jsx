import React from 'react';

// import { Form } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import './Add-Task.styles.css';

import indent from '../indent.png';
import calendar from '../calendar.png';

let formData = {} ;
const handleChange = (e) => {
    formData[e.target.name] = e.target.value.trim();
    console.log(this.myRef);
}; 

export const AddTask = props => (
    <div className = 'AddTask'>
        {/* { console.log("props")} */}
        <div className = 'AddTask TaskElement'>
        <img src={indent} width="20" height="25" />
        {/* <Form.Control 
            name = "taskdetails"
            type = "text"
            placeholder = "Add details"
            onChange = { handleChange }
            // value = {typeof props.todoitem !== "undefined" ?
            //     props.todoitem.name : ""}
        /> */}
        <input 
             name = "taskdetails"
             type = "text"
             placeholder = "Add details"
             onChange = { handleChange } >
        </input>
        </div>
        <div className = 'AddTask TaskElement'>
        <img src={calendar} width="20" height="25" />
        {/* <Form.Control 
            name = "taskdueby"
            type ="datetime-local"
            placeholder = "Add date/time"
            onChange = { handleChange }
            // value = {typeof props.todoitem !== "undefined" ?
            //     props.todoitem.dueby : ""}
        /> */}
        <input 
            name = "taskdueby"
            type ="datetime-local"
            placeholder = "Add date/time"
            onChange = { handleChange }
             >
        </input>
        </div>
        <div className = 'AddTask TaskButton' >
        <button variant="outline-secondary" onClick={(e) => props.handleClickCancel() }>Go Back</button>
        </div>
        <div className = 'AddTask TaskButton' >
        <button variant="outline-primary" onClick={(e) => props.handleClickAdd(formData.taskdetails,formData.taskdueby) }>Add Task</button>
        </div>
    </div> 
);