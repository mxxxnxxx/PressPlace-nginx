import React, { useState } from 'react'
import UserImageUp from '../../components/molecules/UserImageUp'

type Props = {
    name: string
    userImage?: File[]
    setUserImage: (files: File[]) => void
    oldUserImage?: string
    setOldUserImage: (string?: string) => void
}
const EnhancedUserImageUp: React.FC<Props> = ({
    name,
    userImage,
    setUserImage,
    oldUserImage,
    setOldUserImage
}) => {
    const [isFileTypeError, setIsFileTypeError] = useState(false)

    const resetErrors = () => {
        setIsFileTypeError(false)
    }

    const handleCancelNew = () => {
        // windowで確認を取る
        if (confirm("プロフィール画像を消してよろしいですか？")) {
            // エラーを初期化
            resetErrors()
            // concatでphotosをコピー
            const modifyImage = userImage?.concat()
            // spliceメソッドで中身を削除
            modifyImage?.splice(0, 1)
            // その後stateにセット
            modifyImage && setUserImage(modifyImage);
            () => userImage;
        }
    }

    const handleCancelOld = () => {
        // windowで確認を取る
        if (confirm("前のプロフィール画像を消してよろしいですか？")) {
            // エラーを初期化
            resetErrors()
            // oldUserImageはstringなのでからの文字列
            setOldUserImage("")
        }
    }

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // imageがなければ投稿しない
        if (event.target.files === null) { return }
        // 前の写真があれば消しても良いかwindowで確認
        if (!(oldUserImage == "")) { handleCancelOld() }
        if (userImage?.length) { handleCancelNew() }

        const files = Object.values(event.target.files).concat()
        event.target.value = ""
        resetErrors()
        const pickedImage = files.filter((file) => {
            // file.typeの型はblobで定義している
            if (
                ![
                    "image/gif",
                    "image/jpg",
                    "image/jpeg",
                    "image/png",
                    "image/bmp",
                    "image/svg+xml",
                ].includes(file.type)
            ) {
                setIsFileTypeError(true)
                return false
            }
            return true
        })
        if (pickedImage.length === 0) {
            return
        }
        // setPhotos(ここに写真)
        pickedImage && setUserImage(pickedImage.slice(0, 1))
    }
    return (
        <UserImageUp
            name={name}
            userImage={userImage}
            setUserImage={setUserImage}
            isFileTypeError={isFileTypeError}
            oldUserImage={oldUserImage}
            setOldUserImage={setOldUserImage}
            handleFile={handleFile}
            handleCancelNew={handleCancelNew}
            handleCancelOld={handleCancelOld}
        />
    )
}


export default EnhancedUserImageUp
