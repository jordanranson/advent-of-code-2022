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

function findGroupBadge (rucksacks: string[]) {
    const itemsInRucksacks = rucksacks
        .map((rucksack: string) => rucksack.split(''))

    return [
        ...new Set(
            itemsInRucksacks[ 0 ]
                .filter((item) => 
                    itemsInRucksacks[ 1 ].indexOf(item) > -1 && 
                    itemsInRucksacks[ 2 ].indexOf(item) > -1
                )
        )
    ]
}

async function puzzle2 (input: string): Promise<number> {
    const rucksacks = input
        .split('\n')
        .map((item: string) => item.trim())

    const groupsOfElves = []
    for (let i = 0; i < rucksacks.length; i += 3) {
        groupsOfElves.push(rucksacks.slice(i, i + 3))
    }

    return groupsOfElves
        .reduce(
            (badges: string[], group: string[]) => 
                [ ...badges, ...findGroupBadge(group) ], []
        )
        .reduce(
            (value: number, item: string) => 
                value + itemWeight(item), 0
        )
}

export default [
    puzzle1,
    puzzle2
]
