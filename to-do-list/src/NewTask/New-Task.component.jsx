import React from 'react';

// import { Button } from 'react-bootstrap';
import './New-Task.styles.css';

const NewTask = props => (
    <div className = 'NewTask'>
        <button onClick={props.handleClickNew}>New Task</button>
    </div>
);

export { NewTask };