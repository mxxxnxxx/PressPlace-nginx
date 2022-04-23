import React, { useEffect, useState } from 'react'
import { useFormContext } from "react-hook-form"
import TagsForm from '../../components/molecules/TagsForm'
import { Place } from '../../types/Place'

type Props = {
    place?: Place
}

const EnhancedTagsForm: React.FC<Props> = ({ place }) => {

    // タグフォームの個数とindexをstateで管理
    const [tags, setTags] = useState(["tag.0"])
    const methods = useFormContext()

    // タグフォームを増やす関数
    const addTag = () => {
        if (tags.length > 4) {
            return
        }
        const newTags = [...tags];
        newTags.push(`tag.${(tags.length)}`)
        setTags(newTags)
    }

    // タグフォームを減らす関数
    const removeTag = () => {
        // 以下で最後尾のtagFormのvalueを取得
        const tagVal = document.getElementById(tags.slice(-1)[0]);
        if (tags.length > 1 && tagVal) {
            const rmTags = [...tags]
            // popでtagFormから一番末尾の1つだけ破壊的に削除している
            rmTags.pop()
            // react-hook-formのstateを空の文字列にする
            // この処理がないとフォームだけ消えるだけでPost時にはvalが残ってしまう
            methods.setValue(tagVal.id, '')
            setTags(rmTags)
        }
    }

    useEffect(
        () => {
            if (place) {
                const tagsLength = place.tags.length - 1
                for (let i = 0; i < tagsLength; i++) {
                    setTags((tags) => {
                        const newTags = [...tags]
                        newTags.push(`tag.${(tags.length)}`)
                        return newTags
                    });
                }
            }
        }, [])

    return (
        <TagsForm
            tags={tags}
            addTag={addTag}
            removeTag={removeTag}
        />
    )


}
export default EnhancedTagsForm
