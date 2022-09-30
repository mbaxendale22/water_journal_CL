import {
    createEntry,
    fetchEntry,
    updateDailyGoal,
    updateEntry,
} from './database'

import PromptSync from 'prompt-sync'
import { ROUTES, IUser } from './types'
const myPrompt = PromptSync()


export function mainRouter(): string | null {
    let valid = false
    const validInputs = [ROUTES.route1, ROUTES.route2, ROUTES.route3]
    while (!valid) {
        console.log(
            'What would you like to do today?\n1. Add an entry for today\n2. Check todays progess\n3. Update my daily goal',
        )
        const input = myPrompt('your input: ')
        if (validInputs.includes(input)) {
            valid = true
            return input
        }
        console.log('invalid input please try again')
    }
    return null
}

export async function addWater(user: IUser) {
    console.log('how much water would you like to add (ml)?')
    const prev_water = myPrompt('your input: ')
    const water = Number(prev_water)

    //check to see if entry exists for today
    const currentEntry = await fetchEntry(user.id)

    //// if there's an entry, then update it, if not create a new entry for today
    if (!currentEntry) {
        await createEntry(water, user.id)
    } else {
        const new_entry = water + currentEntry?.amount
        await updateEntry(currentEntry.id, new_entry)
    }
}

export async function checkProgress(user: IUser): Promise<void> {
    let progress: number
    let msg: string
    const currentEntry = await fetchEntry(user.id)

    if (!currentEntry) {
        progress = 0
        msg = 'You must be thirsty! Grab some water'
    } else {
        progress = currentEntry.amount
        if (currentEntry.amount < user.daily_goal) {
            const perc = Math.floor(
                (currentEntry.amount / user.daily_goal) * 100,
            )
            msg = `You are ${perc}% of the way there!`
        } else {
            msg = 'You have hit your target for today, nice work!'
        }
    }

    console.log(
        `your progess today is: ${progress}ml\n\nyour daily goal is ${user.daily_goal}ml\n\n${msg}`,
    )
}

export async function updateGoal(user: IUser) {
    console.log('what would you like your daily goal to be?')
    const goal = myPrompt('your input: ')
    const new_goal = Number(goal)
    await updateDailyGoal(new_goal, user)
}
