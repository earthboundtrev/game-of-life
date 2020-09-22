import React from 'react';
import './App.css';
import Board from "./Components/Board";
import Rules from "./Components/Rules";
import { Button } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Conway's Game of Life</p>
        <Rules/>
        <Board/>
        <br/>
        <Button>Play</Button>
        <br/>
        <Button>Stop</Button>
      </header>
    </div>
  );
}

export default App;
