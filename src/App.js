import {useState, useEffect} from 'react';
import './App.css';

const positions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

function App() {
  const [grid, setGrid] = useState()
  const [gridSize, setGridSize] = useState({
    rows: 20,
    cols: 20,
  })
  

  useEffect(() => {
    setGrid(randomGrid())
  },[gridSize])


  const randomGrid = () => {
    const row = []
    for (let i = 0; i < gridSize.rows; i++) {
      row.push(Array.from(Array(gridSize.cols), () => (Math.random() > 0.7 ? 1 : 0)))
    }
    return row
  }

  const startSimulation = () => {
    setGrid(g => {
      const next = g.map((row, i) => {
        return row.map((cell, j) => {
          let neighbor = 0
          positions.forEach((position) => {
            const x = i + position[0]
            const y = j + position[1]
            if(x >= 0 && x < gridSize.rows && y >= 0 && y < gridSize.cols) {
              neighbor += g[x][y]
            }
          })
          if(neighbor < 2 || neighbor > 3) {
            return 0
          }
          if(neighbor === 3) {
            return 1
          }
          return g[i][j]
        })
      })
      return next
    })
  }

  return (
    <div>
      <div className="titleContainer">
        <h1>Game of Life</h1>
      </div>

      <div className="buttonsContainer">
        <button onClick={() => {
          setInterval(() => {
            startSimulation(grid)
          },500)
        }}>Start</button>
        <select onChange={(e) => setGridSize({...setGrid, rows: Number(e.target.value), cols: Number(e.target.value)})}>
          <option value={20}>20x20</option>
          <option value={25}>25x25</option>
          <option value={30}>30x30</option>
        </select>
      </div>

      <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '5rem'}}>
        {grid && 
        grid.map((rows, i) =>
        rows.map((col, k) => (
          <div key={k} style={{
            width: 30,
            height: 30,
            background: grid[i][k] ? 'black' : '',
            border: '1px solid gray',
          }} 
          />
        ))
        )}
      </div>
      
    </div>
  );
}

export default App;
