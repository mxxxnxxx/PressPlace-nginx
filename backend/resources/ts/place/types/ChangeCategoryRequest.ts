import { PlacesQuery } from "./PlacesQuery"

export type ChangeCategoryRequest = {
    sourcePlaces: PlacesQuery
    destinationPlaces: PlacesQuery
    targetPlaceId: number
    destinationCategoryId: number
}
