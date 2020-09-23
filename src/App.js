import React from 'react';
import './App.css';
import GameBoard from "./Components/GameBoard";
import Rules from "./Components/Rules";
import { Button } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Conway's Game of Life</p>
        <Rules/>
        <GameBoard/>
        <br/>
        <Button>Play</Button>
        <br/>
        <Button>Stop</Button>
      </header>
    </div>
  );
}

export default App;
