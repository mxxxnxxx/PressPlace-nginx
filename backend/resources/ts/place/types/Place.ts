
import { User } from '../../user/types/User'
import { PlaceImage } from './PlaceImage'
import { Tag } from './Tag'


export type Place = {
    data: { key: string[] }
    id: number
    name: string
    address: string
    comment: string
    createdAt: Date
    updatedAt: Date
    placeImages: PlaceImage[]
    userId: number
    user: User
    tags: Tag[]
    favoriteUsers?: User[]
}
