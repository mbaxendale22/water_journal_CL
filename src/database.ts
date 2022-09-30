import sqlite3 from 'aa-sqlite'
import { IUser, IWater } from './types'

async function connectDB(): Promise<void> {
    try {
        await sqlite3.open('./water.db')
    } catch (err) {
        console.log(err)
    }
}

export async function loadUser(): Promise<IUser | null> {
    let error
    await connectDB()
    try {
        const usr = await sqlite3.all('SELECT * FROM user')
        if (usr.length !== 1) {
            throw new Error()
        }
        return usr[0]
    } catch (err) {
        console.log(err)
        error = null
    } finally {
        await sqlite3.close()
    }
    return error
}

export async function fetchEntry(userId: number): Promise<IWater | null> {
    let error
    const today = new Date().toISOString().slice(0, 10)
    await connectDB()
    try {
        const entry = await sqlite3.all(
            `SELECT * FROM water WHERE userId=? AND date=?`,
            [userId, today],
        )
        return entry[0]
    } catch (err) {
        console.log(err)
        error = null
    } finally {
        await sqlite3.close()
    }
    return error
}

export async function updateEntry(
    entry_id: number,
    new_entry: number,
): Promise<void | null> {
    let error
    const qry = `UPDATE water SET amount = "${new_entry}" WHERE id = "${entry_id}"`
    await connectDB()
    try {
        await sqlite3.run(qry, [], function (err: Error) {
            if (err) console.log(err.message)
        })
        return console.log('Updated log successfully')
    } catch (err) {
        console.log(err)
        error = null
    } finally {
        await sqlite3.close()
    }
    return error
}

export async function createEntry(
    new_entry: number,
    user_id: number,
): Promise<void | null> {
    let error
    const today = new Date().toISOString().slice(0, 10)
    const qry = `INSERT INTO water (id, userId, amount, date) VALUES(${null}, "${user_id}", "${new_entry}", "${today}")`
    await connectDB()
    try {
        await sqlite3.run(qry, [], function (err: Error) {
            if (err) console.log(err.message)
        })
        return console.log('Your log was updated successfully')
    } catch (err) {
        console.log(err)
        error = null
    } finally {
        await sqlite3.close()
    }
    return error
}

export async function checkDailyGoal() {
    const USER = await loadUser()
    if (USER) {
        console.log(USER.daily_goal)
    }
}


export async function updateDailyGoal(new_entry: number, user: IUser): Promise<void | null>{
    let error
    const qry = `UPDATE user SET daily_goal = "${new_entry}" WHERE id = "${user.id}"`
    await connectDB()
    try {
        await sqlite3.run(qry, [], function (err: Error) {
            if (err) console.log(err.message)
        })
        return console.log('Daily goal updated successfully!')
    } catch (err) {
        console.log(err)
        error = null
    } finally {
        await sqlite3.close()
    }
    return error
}
