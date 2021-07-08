
import { User } from '../../user/types/User';
import { Tag } from './Tag';


export type Place = {
    data: { key: string[] }
    id: number
    name: string
    address: string
    comment: string
    createdAt: Date
    updatedAt: Date
    placeImages: string
    placeId: string
    user: User
    tags: Tag[]
}