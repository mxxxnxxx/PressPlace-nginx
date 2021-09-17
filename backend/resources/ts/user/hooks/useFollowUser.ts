import axios from "axios"

const Follow = async (userId?: number): Promise<boolean> => {
    const { data } = await axios.post(`/api/user/${userId}/follow`)
    return data
}
export default Follow
