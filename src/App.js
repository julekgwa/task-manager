import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from 'components/navigation/navbar';

function App() {
  return (
    <div className='App'>
      <Navbar>
        <a href='#home' class='active'>
          Home
        </a>
        <a href='#news'>News</a>
        <a href='#contact'>Contact</a>
        <a href='#about'>About</a>
        <a href='javascript:void(0);' class='icon' onclick='myFunction()'>
          <i class='fa fa-bars'></i>
        </a>
      </Navbar>
    </div>
  );
}

export default App;
