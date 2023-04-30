import React from 'react';


import { ToDoItem } from '../ToDo-Item/ToDo-Item.component';


export const ToDoList = props => (

    <div>
        {
          props.todo.length > 0 ? 
         props.todo.map(todoitem => (
           <ToDoItem 
              key={todoitem.id} 
              todoitem={todoitem} 
              handleDeleteTask={props.handleDeleteTask}
              handleUpdateTask={props.handleUpdateTask}
              // handleEditTask={props.handleEditTask} 
            /> )) :
            <h3> Nothing here</h3>
        }
    </div>
  
);


