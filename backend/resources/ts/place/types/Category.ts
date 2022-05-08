import { Place } from "./Place"

export type Category = {
    id: number,
    name: string,
    createdAt: Date
    updatedAt: Date
    userId: number
    places: Place[]
    columOrder: number
}
