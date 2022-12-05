import { Puzzle } from "../App"

type Move = [
    qty: number,
    from: number,
    to: number,
]

function getCratePiles (input: string) {
    return input
        .split('\n')
        .slice(0, -1)
        .map((str: string) => str
            .replace(/\s\s\s\s/g, '_')
            .replace(/[\[\]]/g, '')
            .replace(/\s/g, '')
            .trim()
            .split('')
        )
        .reduce((acc: string[][], pile: string[]) => (
            pile.forEach((crate: string, i: number) => {
                if (!acc[ i ]) acc[ i ] = []
                acc[ i ].push(crate)
            }), acc
        ), [])
        .map((pile: string[]) => pile
            .filter((crate: string) => crate !== '_')
        )
}

function getMoves (input: string): Move[] {
    return input
        .split('\n')
        .map((str: string) => str
            .trim()
            .split(' ')
            .map((str: string) => parseInt(str))
            .filter((num: number) => !isNaN(num)) as Move
        )
}

function getCratesAndMoves (input: string): [ string[][], Move[] ] {
    const [ crates, moves ] = input.split(/\n\s*\n/)
    
    return [
        getCratePiles(crates),
        getMoves(moves)
    ]
}

async function puzzle1 (input: string): Promise<string> {
    const [ cratePiles, moves ] = getCratesAndMoves(input)

    moves.forEach(([ qty, from, to ]) => {
        for (let i = 0; i < qty; i++) {
            cratePiles[ to - 1 ].unshift((cratePiles[ from - 1 ] as string[]).shift() as string)
        }
    })

    return cratePiles.reduce((acc, pile) => (acc + pile[ 0 ]), '')
}

async function puzzle2 (input: string): Promise<string> {
    const [ cratePiles, moves ] = getCratesAndMoves(input)

    moves.forEach(([ qty, from, to ]) => {
        cratePiles[ to - 1 ].unshift(...cratePiles[ from - 1 ].splice(0, qty))
    })

    return cratePiles.reduce((acc, pile) => (acc + pile[ 0 ]), '')
}

export default [
    puzzle1,
    puzzle2,
    {
        dontTrimInput: true
    }
] as Puzzle
