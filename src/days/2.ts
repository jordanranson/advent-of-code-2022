type MovePair = [ 
    'A' | 'B' | 'C', 
    'X' | 'Y' | 'Z'
]

const MoveValues = {
    X: 1,
    Y: 2,
    Z: 3,
}

const MoveOutcomes = {
    A: { // rock
        X: 3, // rock
        Y: 6, // paper
        Z: 0, // scissors
    },
    B: { // paper
        X: 0, // rock
        Y: 3, // paper
        Z: 6, // scissors
    },
    C: { // scissors
        X: 6, // rock
        Y: 0, // paper
        Z: 3, // scissors
    }
}

const MoveStrategies: Record<MovePair[ 0 ], Record<MovePair[ 1 ], MovePair[ 1 ]>> = {
    A: { // rock
        X: 'Z', // lose
        Y: 'X', // draw
        Z: 'Y', // win
    },
    B: { // paper
        X: 'X', // lose
        Y: 'Y', // draw
        Z: 'Z', // win
    },
    C: { // scissors
        X: 'Y', // lose
        Y: 'Z', // draw
        Z: 'X', // win
    }
}

async function puzzle1 (input: string): Promise<number> {
    return input
        .split('\n')
        .map((str: string) => str.trim().split(' ') as MovePair)
        .reduce(
            (acc: number, moves: MovePair) => {
                acc += MoveValues[ moves[ 1 ] ]
                acc += MoveOutcomes[ moves[ 0 ] ][ moves[ 1 ] ]
                return acc
            }, 0
        )
}

async function puzzle2 (input: string): Promise<number> {
    return input
        .split('\n')
        .map((str: string) => str.trim().split(' ') as MovePair)
        .reduce(
            (acc: number, moves: MovePair) => {
                const myMove = MoveStrategies[ moves[ 0 ] ][ moves[ 1 ] ]
                acc += MoveValues[ myMove ]
                acc += MoveOutcomes[ moves[ 0 ] ][ myMove ]
                return acc
            }, 0
        )
}

export default [
    puzzle1,
    puzzle2
]
