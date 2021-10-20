import {
    Box, Button, TextField, Typography, useTheme
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
    const theme = useTheme()
    return (
        <Box textAlign="center" style={{ margin: theme.spacing(2) }}>
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
                                    const { tag } = methods.getValues()
                                    return tag.every((v: never, i: number, self: []) => self.indexOf(v) === i) || "タグが重複しています"
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
                    </Typography>}
            </Box>
            <Button type="button" onClick={() => addTag()}>
                +
            </Button>
            {tags.length > 1 && (
                <Button type="button" onClick={() => { removeTag() }}>
                    -
                </Button>
            )}
        </Box>
    )


}
export default TagsForm
