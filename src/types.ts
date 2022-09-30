
export interface IRoutes {
    route1: string
    route2: string
    route3: string
}

export const ROUTES: IRoutes = {
    route1: '1',
    route2: '2',
    route3: '3',
}

export interface IUser {
    id: number
    username: string
    daily_goal: number
}

export interface IWater {
    id: number
    userId: string
    amount: number
    date: string
}

