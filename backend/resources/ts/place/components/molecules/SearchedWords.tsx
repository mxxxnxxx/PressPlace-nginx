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
    searchKey?: Inputs
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
    PlaceSearchButton: {
        marginLeft: 'auto',

    }
}))

const SearchedWords: FC<Props> = ({ searchKey, places, removeKey }) => {
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

                {searchKey?.name &&
                    <Button
                        startIcon={<HighlightOffIcon />}
                        className={classes.SearchKeys}
                        onClick={() => {
                            removeKey("name")
                        }}

                    >
                        {searchKey?.name}
                    </Button>}
                {searchKey?.address &&
                    <Button
                        startIcon={<HighlightOffIcon />}
                        className={classes.SearchKeys}
                        onClick={() => {
                            removeKey("address")
                        }}
                    >
                        {searchKey?.address}
                    </Button>}
                {searchKey?.comment &&
                    <Button
                        startIcon={<HighlightOffIcon />}
                        className={classes.SearchKeys}
                        onClick={() => {
                            removeKey("comment")
                        }}
                    >
                        {searchKey?.comment}
                    </Button>}

                {searchKey?.tag?.map((tag: string, index: number) => (
                    !(tag === "") &&
                    <Button
                        key={index.toString()}
                        startIcon={<HighlightOffIcon />}
                        className={classes.SearchKeys}
                        onClick={() => {
                            removeKey("tag", index)
                        }}
                    >
                        {tag}
                    </Button>
                ))}
            </Box>
        </section>
    )
}
export default SearchedWords
