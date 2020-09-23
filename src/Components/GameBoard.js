import React, { useState } from 'react';
import '../App.css';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

// const [cell, setCells ] useState something simple I am missing with declaration, need to figure it out

const GameBoard = () => {

    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = makeEmptyBoard()

    const { cells } = this.state;


    const makeEmptyBoard = () => {
        let board = [];

        for (let y = 0; y < this.rows; y++) {
            board[y] = []

            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
            return board;
        }
    }

    const makeCells = () => {
        let cells = [];

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }

            }
        }
        return cells;
    }

    const getElementOffset = () => {

        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {

            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop
        };

    }

    const handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: makeCells() });
    }

    const Cell = () => {

        const { x, y } = this.props;

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
                onClick={handleClick} ref={(n) => { this.boardRef = n; }}>
                {cells.map(cell => (
                    <Cell x={cell.x} y={cell.y}
                        key={`{$cell.x}}, ${cell.y}`} />
                ))}
            </div>
        </div>
    )
}

export default GameBoard;