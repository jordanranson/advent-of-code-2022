function getCaloriesPerElf (input: string) {
    const snacks = input
        .split('\n')
        .map((str: string) => parseInt(str))

    const elves: number[] = []

    snacks
        .reduce((acc: number[], snack: number) => {
            if (isNaN(snack)) {
                elves.push(acc.reduce((a, b) => a + b, 0))
                return []
            }
            return [ ...acc, snack ]
        }, [])

    return elves.sort((a: number, b: number) => b - a)
}

async function puzzle1 (input: string): Promise<number> {    
    return getCaloriesPerElf(input)[ 0 ]
}

async function puzzle2 (input: string): Promise<number> {
    return getCaloriesPerElf(input)
        .slice(0, 3)
        .reduce(
            (totalCalories: number, calories: number) => 
                totalCalories + calories, 0
        )
}

export default [
    puzzle1,
    puzzle2
]
