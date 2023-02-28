import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function App() {

  const [ broBizzs, setBroBizzs ] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7029/brobizz').then((response) => {
      console.log(response)
      setBroBizzs(response.data);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {broBizzs.map((brobizz : any) => (<li key={brobizz.id}>{brobizz.name}</li>))}
        </ul>
      </header>
    </div>
  );
}

export default App;
