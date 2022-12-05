import React from 'react'
import { useEffect, useRef, useState } from 'react'
import './App.css'

import day1 from './days/1'
import day2 from './days/2'
import day3 from './days/3'
import day4 from './days/4'
import day5 from './days/5'

export type Puzzle = [
  puzzle1: (input: string) => Promise<string | number>,
  puzzle2: (input: string) => Promise<string | number>,
  options?: {
    dontTrimInput?: boolean
  }
]

const puzzles: Record<string, Puzzle> = {
  '1': day1,
  '2': day2,
  '3': day3,
  '4': day4,
  '5': day5,
}

function App () {
  const initialValue: [ string, number ] = window.location.href.includes('puzzle')
    ? (window.location.href
      .split('#')[ 1 ]
      .replace('puzzle=', '')
      .split('.')
      .map((str, i) => i !== 0 ? parseInt(str) : str)) as [ string, number ]
    : [ '1', 0 ]

  const [ isLoading, setIsLoading ] = useState(true)
  const [ currentPuzzle, setCurrentPuzzle ] = useState<[ string, number ]>(initialValue)
  const [ puzzleInput, setPuzzleInput ] = useState('')
  const [ puzzleOutput, setPuzzleOutput ] = useState('')
  const [ execError, setExecError ] = useState('')

  const startTimeRef = useRef(0)
  const [ timeElapsed, setTimeElapsed ] = useState(-1)

  const execute = async (input: string) => {
    setExecError('')
    setTimeElapsed(-1)
    startTimeRef.current = performance.now()
    
    try {
      const [
        puzzle1,
        puzzle2,
        options,
      ] = puzzles[currentPuzzle[0]]

      const puzzleResolver = currentPuzzle[1] === 0 ? puzzle1 : puzzle2
      const puzzleInput = options?.dontTrimInput ? input : input.trim()
      const output = await puzzleResolver(puzzleInput)

      setPuzzleOutput(output.toString())
    } catch (err: any) {
      console.error(err)
      setExecError(err.message)
      setTimeElapsed(-1)
    }

    setTimeElapsed(performance.now() - startTimeRef.current)
  }

  useEffect(() => {
    const fetchInput = async () => {
      setIsLoading(true)

      const response = await fetch(`/inputs/${currentPuzzle[0]}.txt`)
      const input = await response.text()
      setPuzzleInput(input)

      await execute(input)

      setIsLoading(false)
    }
    fetchInput()
  }, [ currentPuzzle ])

  return (
    <div className='App'>
      <div>
        <p>
          Choose a Day and Puzzle
        </p>
        <select
          value={currentPuzzle[0] + '.' + currentPuzzle[1]}
          onChange={(evt) => {
            const parts = evt.target.value.split('.')
            setCurrentPuzzle([ parts[0], parseInt(parts[1]) ])
            window.location.href = `#puzzle=${parts[0] + '.' + parts[1]}`
          }}
        >
          {
            Object.keys(puzzles).map((day, index) => (
              <React.Fragment key={index}>
                <option value={`${day}.0`}>Dec {day} - Puzzle 1</option>
                <option value={`${day}.1`}>Dec {day} - Puzzle 2</option>
              </React.Fragment>
            ))
          }
        </select>
      </div>

      <section>
        <div>
          <p>
            Input
          </p>
          <textarea 
            value={puzzleInput} 
            onChange={(evt) => setPuzzleInput(evt.target.value)}
          />
        </div>
        <br />
        
        <div>
          <p>
            Output
          </p>
          <textarea defaultValue={puzzleOutput} />
        </div>
        <br />
      </section>
      
      <div>
        <p>
          <button 
            onClick={async () => {
              setIsLoading(true)
              await execute(puzzleInput)
              setIsLoading(false)
            }} 
            disabled={isLoading}
          >
          {
            isLoading
              ? <>...</>
              : <>Execute</>
          }
          </button>
          <br />
          {
            execError
              ? <small style={{ color: '#DC3535' }}>
                  <code><strong>Error:</strong>&nbsp;{execError}</code>
                </small>
              : timeElapsed >= 0
                ? <small>Executed in <strong>{timeElapsed}</strong> ms.</small>
                : <small>&nbsp;</small>
          }
        </p>
      </div>
    </div>
  )
}

export default App
