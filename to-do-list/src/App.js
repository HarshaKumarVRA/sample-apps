import React from 'react';
// import logo from './logo.svg';
import './App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

import  AppClass from './App/App-Class.component';
import  AppFunction from './App/App-Function.component';


function App() {
  return (
    <div className='App'>
    <AppClass />
    <AppFunction />
    </div>
  );
}

export default App;
