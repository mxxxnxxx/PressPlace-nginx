import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Place } from '../types/Place';

const usePostPlaceQuery = (formData:FormData) => {
    axios({
        // php側のstoreメソッドのルートのurl
        url: "api/place",
        method: "post",
        data: formData,
        // formの送信時のenctype
        headers: {
            "content-type": "multipart/form-data",
        },
    })
        .then(() => {
            // ここにモーダルコンポーネント
            // return setOpen(true);

        })
        .catch(() => {
            alert("エラーが発生しました。");

        });
}

export default usePostPlaceQuery

