import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import { QueryClient } from 'react-query';
import {
    Button,
    Box,
    TextField, Typography,
} from '@material-ui/core';
import { Place } from '../../types/Place';
import { useEffect } from 'react';
import { async } from 'q';

type Props = {
    tags: string[]
    addTag: () => void
    removeTag: () => void
}

const TagsForm: React.FC<Props> = ({ tags, addTag, removeTag }) => {

    const methods = useFormContext();
    return (
        <Box textAlign="center">

            <Button type="button" onClick={()=>addTag()}>
                +
            </Button>
            {tags.length > 1 && (
                <Button type="button" onClick={() => { removeTag() }}>
                    -
                </Button>
            )}
            {tags.map((tag, _) => {
                return (
                    <div key={tag.toString()}>
                        <TextField
                            key={tag.toString()}
                            id={tag.toString()}
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