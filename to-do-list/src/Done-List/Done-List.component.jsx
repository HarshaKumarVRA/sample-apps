import React from 'react';

import './Done-List.styles.css';
import { ToDoItem } from '../ToDo-Item/ToDo-Item.component';


export const DoneList = props => (

    <div className = 'DoneList'>
        {
          props.todo.length > 0 ? 
         props.todo.map(todoitem => (
           <ToDoItem 
              key={todoitem.id} 
              todoitem={todoitem} 
            /> )) :

            <h3> No Tasks here</h3>
        }
    </div>
  
);


