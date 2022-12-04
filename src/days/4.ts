function getRangesInPair (input: string) {
    return input
        .split(',')
        .map((pair) => pair
            .split('-')
            .map((str) => parseInt(str))
        )
}

async function puzzle1 (input: string): Promise<number> {
    return input
        .split('\n')
        .map((str: string) => getRangesInPair(str))
        .reduce((numOverlaps: number, pair: number[][]) => (
            numOverlaps + (
                !!pair.reduce((acc: number, range: number[], i: number) => (
                    acc + (
                        range[ 0 ] >= pair[ 1 - i ][ 0 ] && 
                        range[ 1 ] <= pair[ 1 - i ][ 1 ] 
                            ? 1 : 0
                    )), 0
                ) ? 1 : 0
            )), 0
        )
}

async function puzzle2 (input: string): Promise<number> {
    return input
        .split('\n')
        .map((str: string) => getRangesInPair(str))
        .reduce((numOverlaps: number, pair: number[][]) => (
            numOverlaps + (
                !!pair.reduce((acc: number, range: number[], i: number) => (
                    acc + (
                        range[ 0 ] <= pair[ 1 - i ][ 1 ] && 
                        pair[ 1 - i ][ 0 ] <= range[ 1 ]
                            ? 1 : 0
                    )), 0
                ) ? 1 : 0
            )), 0
        )
}

export default [
    puzzle1,
    puzzle2
]
