import axios from "axios"

const UnFollow = async (userId?: number): Promise<boolean> => {
    const { data } = await axios.delete(`/api/user/${userId}/unfollow`)
    return data
}
export default UnFollow
