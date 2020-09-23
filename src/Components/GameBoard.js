import React, { useState } from 'react';
import '../App.css';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

const GameBoard = () => {

    let rows = HEIGHT / CELL_SIZE;
    let cols = WIDTH / CELL_SIZE;
    let boardRef = []
    const [cells, setCells ] = useState({
        isRunning: false,
        cell: [],
        interval: 100
    }); 

    const runGame = () => {
        setCells({
            isRunning: true
        });
    }

    const stopGame = () => {
        setCells({
            isRunning: false
        });
    }

    const handleIntervalChange = (event) => {
        setCells({
            interval: event.target.value
        });
    }

    // const { cells } = this.state;


    const makeEmptyBoard = () => {
        let board = [];

        for (let y = 0; y < rows; y++) {
            board[y] = []

            for (let x = 0; x < cols; x++) {
                board[y][x] = false;
            }
            return board;
        }
    }

    let board = makeEmptyBoard()

    const makeCells = () => {
        let cells = [];

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (board[y][x]) {
                    cells.push({ x, y });
                }

            }
        }
        return cells;
    }

    const getElementOffset = () => {

        const rect = boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {

            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop
        };

    }

    const handleClick = (event) => {
        const elemOffset = getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
            board[y][x] = !board[y][x];
        }

        setCells({ cells: makeCells() });
    }

    const Cell = (props) => {

        const { x, y } = props;

        return (
            <div className="Cell" style={{ left: `${CELL_SIZE * x + 1}px}`, top: `${CELL_SIZE * y + 1} px`, width: `${CELL_SIZE - 1}px`, height: `${CELL_SIZE - 1}px`, }}>

            </div>
        )
    }

    return (
        <div>
            <div className="Board"
                style={
                    {
                        width: WIDTH, height: HEIGHT,
                        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
                    }}
                onClick={handleClick} ref={(n) => { boardRef = n; }}>
                {cells.map(cell => (
                    <Cell x={cell.x} y={cell.y}
     add                    key={`{$cell.x}}, ${cell.y}`} />
                ))}
            </div>
        </div>
    )
}

export default GameBoard;