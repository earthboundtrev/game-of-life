import React, { useState } from 'react';
import '../App.css';
import { Button } from 'reactstrap';
import Cell from './Cell';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

// const Cell = (props) => {

//     const { x, y } = props;

//     return (
//         <div className="Cell" style={{ left: `${CELL_SIZE * x + 1}px}`, top: `${CELL_SIZE * y + 1} px`, width: `${CELL_SIZE - 1}px`, height: `${CELL_SIZE - 1}px`, }}>

//         </div>
//     )
// }

const GameBoard = () => {

    let rows = HEIGHT / CELL_SIZE;
    let cols = WIDTH / CELL_SIZE;
    let boardRef = []
    const [cells, setCells] = useState({
        isRunning: false,
        cell: [],
        interval: 100
    });

    let calculateNeighbors = (board, x, y) => {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }

    let runIteration = () => {

        console.log('running iteration');

        let newBoard = makeEmptyBoard()

        board = newBoard;

        setCells({
            cells: makeCells()
        });

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                let neighbors = calculateNeighbors(board, x, y);
                if (board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                    else {
                        newBoard[y][x] = false;
                    }
                }
                else {
                    if (board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }



    let timeoutHandler = () => { window.setTimeout(() => {
            runIteration();
        },
            cells.interval
        );
    }
    }
    let runGame = () => {

        setCells({
            isRunning: true
        })

        runIteration();
    }

    let stopGame = () => {
        setCells({
            isRunning: false
        });

        if (timeoutHandler) {
            window.clearTimeout(timeoutHandler)
            timeoutHandler = null;
        }
    }

    let handleIntervalChange = (event) => {
        setCells({
            interval: event.target.value
        });
    }

    let makeEmptyBoard = () => {
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

    let makeCells = () => {
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

    let getElementOffset = () => {

        const rect = boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {

            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop
        };

    }

    let handleClick = (event) => {
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

    let handleClear = (event) => {
        setCells({ interval: event.target.value })
    }

    let handleRandom = () => {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                board[y][x] = (Math.random() >= 0.5)
            }
        }
        setCells({ cells: makeCells })
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
                        key={`{$cell.x}}, ${cell.y}`} />
                ))}
            </div>
            <div className="controls"> Update every <input value={cells.interval} onChange={handleIntervalChange} /> msec
            {cells.isRunning ? <Button onClick={stopGame}>Stop</Button> : <Button onClick={runGame}>Play</Button>}
                <Button onClick={handleRandom}>Random</Button>
                <Button onClick={handleClear}>Clear</Button>

            </div>
        </div >
    )
}

export default GameBoard;