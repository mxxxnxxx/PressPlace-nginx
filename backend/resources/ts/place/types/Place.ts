
import { User } from '../../user/types/User'
import { PlaceImage } from './PlaceImage'
import { Tag } from './Tag'


export type Place = {
    data: { key: string[] }
    id: any
    name: string
    address: string
    comment: string
    createdAt: Date
    updatedAt: Date
    placeImages: PlaceImage[]
    placeId: string
    user: User
    tags: Tag[]
}
