import { useEffect, useRef, useState } from 'react'
import './App.css'

import day01 from './days/1'

const puzzles: Record<string,  ((input: string) => Promise<string | number>)[]> = {
  '1': day01
}

function App () {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ currentPuzzle, setCurrentPuzzle ] = useState<[ string, number ]>([ '1', 0 ])
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
      const output = await puzzles[currentPuzzle[0]][currentPuzzle[1]](input.trim())
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
          }}
        >
          <option value='1.0'>Dec 1 - Puzzle 1</option>
          <option value='1.1'>Dec 1 - Puzzle 2</option>
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
