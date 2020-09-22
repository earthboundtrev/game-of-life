import React, { useState } from 'react';
import '../App.css';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

const [ ]

const Board = () => {
    return (
        <div>
            <div className="Board" style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}>
            </div>
        </div>
    )
}

export default Board;