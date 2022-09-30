import PromptSync from 'prompt-sync'
import { loadUser } from './database'
import { addWater, checkProgress, mainRouter, updateGoal } from './routeHandlers'
import { ROUTES } from './types'

const myPrompt = PromptSync()


async function main() {
    const user = await loadUser()
    if (!user) return
    let exit = false
    while (!exit) {
        const route = mainRouter()

        if (route === ROUTES.route1) {
            await addWater(user)
        } else if (route === ROUTES.route3) {
            await updateGoal(user)
        } else {
            await checkProgress(user)
        }

        console.log('Would you like to do anything else today? (Y/n)')
        const input = myPrompt('your input: ').toLowerCase()
        if (input === 'n') {
            exit = true
        }
    }
}

main()
