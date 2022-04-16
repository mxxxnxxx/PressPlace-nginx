import {
    Box, Button, TextField, Typography
} from '@material-ui/core'
import React from 'react'
import { useFormContext } from "react-hook-form"

type Props = {
    tags: string[]
    addTag: () => void
    removeTag: () => void
}

const TagsForm: React.FC<Props> = ({ tags, addTag, removeTag }) => {

    const methods = useFormContext()
    return (
        <>
            {tags.map((tag, _) => {
                return (
                    <TextField
                        key={tag.toString()}
                        id={tag.toString()}
                        label='タグ'
                        name={tag.toString()}
                        inputRef={methods.register({
                            maxLength: { value: 20, message: '20文字以内で入力してください' },
                            validate: {
                                matchesTags: () => {
                                    // 以下で 単体のタグではなく 全体 のタグ を配列で取得
                                    const { tag } = methods.getValues()
                                    // ''を無視してバリデーションをするために ''をフィルター
                                    const tags = tag.filter(Boolean)
                                    // every関数で配列内の要素にたいして 指定した関数を実行
                                    // indexOfでタグの値をつかい検索
                                    // 重複していなければ全ての 返り値が配列のindexと 一致する
                                    // 一致すればevery関数がtrueを返す
                                    // 位置しなければfalseを返しメッセージを表示
                                    // 空白は飛ばそう
                                    return tags.every((v: never, i: number, self: []) => self.indexOf(v) === i) || "タグが重複しています"
                                }
                            },
                        })
                        }
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={Boolean(methods.errors.tag)}
                    />
                )
            })}
            <Box>
                <Typography variant="overline" color="initial" >
                    ※タグは5個まで入力できます
                </Typography>
            </Box>
            <Box>
                {methods.errors.tag &&
                    <Typography variant="overline" color="error">
                        タグが重複しています
                    </Typography>
                }
            </Box>
            <Box>
                {tags.length < 5 &&
                    <Button type="button" onClick={() => addTag()}>
                        +
                    </Button>
                }
                {tags.length > 1 &&
                    <Button type="button" onClick={() => { removeTag() }}>
                        -
                    </Button>
                }
            </Box>
        </>
    )


}
export default TagsForm
