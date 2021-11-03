// import { useQueryClient, useQuery, useMutation } from "react-query"
// import { useHistory, useLocation } from "react-router-dom"
// import { Inputs } from "../types/Inputs"

// const history = useHistory()
// const location = useLocation()
// const { from } = (location.state as { from: string }) || {
//     from: { pathname: '/places/searched' }
// }
// const queryClient = useQueryClient()
// const onSubmit = async (InputsData: Inputs): Promise<void> => {
//     const { tag, name, comment, address } = InputsData
//     if (
//         name === "" &&
//         comment === "" &&
//         address === "" &&
//         tag?.length === 0
//     ) {
//         // フォームが空の場合はPOSTしない
//         return
//     }
//     // 前回の検索履歴の削除
//     queryClient.removeQueries('PlaceSearched', { exact: false })
//     // 検索ワードをキャッシュし移動 移動先のコンポーネントで検索
//     history.push(from)
// }

// const usePlaceSearchWordMutation = (): UseMutationResult<
//     Place,
//     AxiosError,
//     FormData,
//     undefined
// > => {
//     return useMutation(

//     )
// }

// export default usePlaceSearchWordMutation
