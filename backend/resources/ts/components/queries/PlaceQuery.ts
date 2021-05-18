import { useQuery } from "react-query";
import * as api from "../api/PlaceAPI"
// useQueryでステータスの管理をできるようにする dataからplacesに中身にデータの変数名を変更している
const usePlace = () => {
    return useQuery('places', async () => api.getPlace())
}

export {
    usePlace
}