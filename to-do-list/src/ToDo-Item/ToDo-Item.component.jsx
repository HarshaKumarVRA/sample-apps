import React from 'react';

// import { Form } from 'react-bootstrap';
// import { Table } from 'react-bootstrap';
import './ToDo-Item.component.css'
import deleteitem from '../deleteitem.png';

export const ToDoItem = props => (
    <table>
        {/* <input
                type='radio'
                id={props.todoitem.id}
                key={props.todoitem.id}
             />                      */}
        <tbody>
            <tr>
                <td>
                <div onClick = {(e) => props.handleUpdateTask(props.todoitem.name,props.todoitem.dueby,!props.todoitem.completed)} >
                    <input
                        type='radio'
                        id={props.todoitem.id}
                        key={props.todoitem.id}
                        value = {props.todoitem.completed}
                        // onClick ={(e) => props.handleCompleteTask(props.todoitem.name,props.todoitem.dueby)}
                    // className = 'form-switch form-check-input '
                    />
                </div>
                </td> 
                {/* <div onClick = {(e) => props.handleEditTask(props.todoitem.name,props.todoitem.dueby)}> */}
                <td>
                    {props.todoitem.name}
                </td>
                <td>
                {
                    typeof props.todoitem.dueby !== 'undefined' ?
                    <div className={props.todoitem.completed===false?(Date.now() > Date.parse(props.todoitem.dueby) ?
                        'DueDate afterdue' : 'DueDate'):'DueDate'}>
                        {new Date(props.todoitem.dueby).toLocaleTimeString(undefined,
                            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: false })
                        }
                    </div> : null
                }
                </td>
                {/* </div> */}
                <td>
                    <div onClick = {(e) => props.handleDeleteTask(props.todoitem.name,props.todoitem.dueby)} >
                        <img src={deleteitem} width="20" height="25" />
                    </div> 
                </td> 
            </tr>
        </tbody>
    </table>

);

// 