import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import {
    Button,
    Box,
    TextField,
} from '@material-ui/core'

type Props = {
}

const TagsForm: React.FC<Props> = () => {
    const [tags, setTags] = useState(["tag.0"]);
    const methods = useFormContext();

    const addTag = () => {
        const newTags = [...tags];
        newTags.push(`tag.${(tags.length)}`);
        setTags(newTags);
        console.log(tags)

    }

    const removeTag = () => {
        if (tags.length > 1) {
            const rmTags = [...tags];
            // spliceで配列のindexで選択してきたtagFormから1つだけ削除している
            rmTags.pop()
            setTags(rmTags);
            console.log(tags)
        }
    }

    return (
        <Box>
            <Button type="button" onClick={addTag}>
                +
            </Button>
            {tags.map((tag, index) => {
                return (
                    <div key={tag.toString()}>
                        <TextField
                            label='タグ'
                            name={tag}
                            inputRef={methods.register({
                                maxLength: { value: 10, message: '10文字以内で入力してください' }
                            })
                            }
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />
                    </div>
                )
            })}
            {
                tags.length > 1 && (
                    <Button type="button" onClick={() => { removeTag() }}>
                        -
                    </Button>
                )
            }
        </Box>
    )


}
export default TagsForm;