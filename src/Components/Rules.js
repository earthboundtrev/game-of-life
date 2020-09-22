import React from 'react'
import '../App.css'


const Rules = () => {

    return (
        <div>
            <p>Rules:</p>
            <p>1. Any live cell with two or three live neighbors survives.</p>
            <p>2. Any dead cell with three live neighbors becomes a live cell.</p>
            <p>3. All other live cells die in the next generation. Similiarly, all other dead cells stay dead.</p>
        </div>
    )
}

export default Rules;