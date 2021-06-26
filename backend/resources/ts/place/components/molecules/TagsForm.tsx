import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import {
    Button,
    Box,
    TextField, Typography,
} from '@material-ui/core'

type Props = {
}

const TagsForm: React.FC<Props> = () => {
    const [tags, setTags] = useState(["tag.0"]);
    const methods = useFormContext();
    const addTag = () => {
        if (tags.length > 4) {
            return
        }
        const newTags = [...tags];
        newTags.push(`tag.${(tags.length)}`);
        setTags(newTags);
        console.log(tags)

    }

    const removeTag = () => {
        if (tags.length > 1) {
            const rmTags = [...tags];
            console.log(rmTags)
            // popでtagFormから一番末尾の1つだけ削除している
            rmTags.pop()
            setTags(rmTags);

        }
    }

    return (
        <Box textAlign="center">

            <Button type="button" onClick={addTag}>
                +
            </Button>
            {tags.length > 1 && (
                <Button type="button" onClick={() => { removeTag() }}>
                    -
                </Button>
            )}
            {tags.map((tag, index) => {
                return (
                    <div key={tag.toString()}>
                        <TextField
                            label='タグ'
                            name={tag}
                            inputRef={methods.register({
                                maxLength: { value: 20, message: '20文字以内で入力してください' },
                                validate: {
                                    matchesTags: () => {
                                        const { tag } = methods.getValues();
                                        return tag.every((v: never, i: number, self: []) => self.indexOf(v) === i) || "タグが重複しています";
                                    }
                                },
                            })
                            }
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={Boolean(methods.errors.tag)}
                        />
                    </div>
                )
            })}
            <Box>
                <Typography variant="overline" color="initial" >
                    ※タグは5個まで登録できます
                </Typography>
            </Box>
            <Box>
                {methods.errors.tag &&
                    <Typography variant="overline" color="error">
                        タグが重複しています
                    </Typography>}
            </Box>

        </Box>
    )


}
export default TagsForm;