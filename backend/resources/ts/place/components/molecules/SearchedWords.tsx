import {
    Box, Button, makeStyles
} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import ListAltIcon from '@material-ui/icons/ListAlt'
import SearchIcon from '@material-ui/icons/Search'
import React, { FC } from 'react'
import { Inputs } from '../../types/Inputs'
import { Places } from '../../types/Places'

type Props = {
    InputsData?: Inputs
    places?: Places
    removeKey: (type: any, index?: number | undefined) => void
}
const useStyles = makeStyles(() => ({
    SearchKeysArea: {
        width: '100%'
    },
    SearchKeys: {
        textDecoration: 'none',
        textTransform: 'none',
        color: 'inherit',
    },
}))

const SearchedWords: FC<Props> = ({ InputsData, places, removeKey }) => {
    const classes = useStyles()
    return (
        <section className={classes.SearchKeysArea}>
            <Box
                display="flex"
                flexWrap="nowrap"
                p={1}
                m={1}
            >
                <Button
                    startIcon={<ListAltIcon />}
                    className={classes.SearchKeys}
                >
                    検索結果:{places?.total}
                </Button>
                <Button
                    startIcon={<SearchIcon />}
                    className={classes.SearchKeys}
                >
                    検索ワード
                </Button>

                {InputsData?.name &&
                    <Button
                        startIcon={<HighlightOffIcon />}
                        className={classes.SearchKeys}
                        onClick={() => {
                            removeKey("name")
                        }}

                    >
                        {InputsData?.name}
                    </Button>}
                {InputsData?.address &&
                    <Button
                        startIcon={<HighlightOffIcon />}
                        className={classes.SearchKeys}
                        onClick={() => {
                            removeKey("address")
                        }}
                    >
                        {InputsData?.address}
                    </Button>}
                {InputsData?.comment &&
                    <Button
                        startIcon={<HighlightOffIcon />}
                        className={classes.SearchKeys}
                        onClick={() => {
                            removeKey("comment")
                        }}
                    >
                        {InputsData?.comment}
                    </Button>}

                {InputsData?.tag?.map((tag: string, index: number) => (
                    !(tag === "") &&
                    <Button
                        key={index.toString()}
                        startIcon={<HighlightOffIcon />}
                        className={classes.SearchKeys}
                        onClick={() => {
                            removeKey("tag", index)
                            console.log(InputsData.tag);
                        }}
                    >
                        {tag}
                    </Button>
                ))}
            </Box>
        </section >
    )
}
export default SearchedWords
