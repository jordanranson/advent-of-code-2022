function findUnsortedItems (rucksack: string) {
    const items = rucksack.split('')

    const compartments = [ 
        items.splice(0, items.length / 2),
        items
    ]

    return [
        ...new Set(
            compartments[ 0 ]
                .filter((item) => compartments[ 1 ].indexOf(item) > -1)
        )
    ]
}

function itemWeight (item: string) {
    return item.match(/[a-z]/)
        ? item.charCodeAt(0) - 96
        : item.charCodeAt(0) - 38
}

async function puzzle1 (input: string): Promise<number> {
    return input
        .split('\n')
        .map((item: string) => item.trim())
        .reduce(
            (unsortedItems: string[], rucksack: string) => 
                [ ...unsortedItems, ...findUnsortedItems(rucksack) ], []
        )
        .reduce(
            (value: number, item: string) => 
                value + itemWeight(item), 0
        )
}

async function puzzle2 (input: string): Promise<number> {
    return -1
}

export default [
    puzzle1,
    puzzle2
]
