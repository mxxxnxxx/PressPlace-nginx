import {
    Menu,
    MenuItem,
    MenuList,
    ListItem,
    makeStyles,
    Button,
    Typography,
    Box,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';
import ListAltIcon from '@material-ui/icons/ListAlt';
import React, { FC } from 'react';
import { Inputs } from '../../types/Inputs';
import { Places } from '../../types/Places';

type Props = {
    InputsData?: Inputs
    places?: Places
    removeKey: (key: string) => void
}
const useStyles = makeStyles(() => ({
    SearchKeysArea: {
        width: '100%'
    },
    SearchKeys: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

const SearchedWords: FC<Props> = ({ InputsData, places, removeKey }) => {
    const classes = useStyles();
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
                    >
                        {InputsData?.name}
                    </Button>}
                {InputsData?.address &&
                    <Button
                        startIcon={<HighlightOffIcon />}
                        className={classes.SearchKeys}
                    >
                        {InputsData?.address}
                    </Button>}
                {InputsData?.comment &&
                    <Button
                        startIcon={<HighlightOffIcon />}
                        className={classes.SearchKeys}
                    >
                        {InputsData?.comment}
                    </Button>}
                {/* {!(InputsData?.tags.length === 0) &&
                    InputsData?.tags.map((tag: string, index: number) => (
                        <Button
                            startIcon={<HighlightOffIcon />}
                            className={classes.SearchKeys}
                            key={index.toString()}
                        >
                            {tag}
                        </Button>
                    ))} */}
            </Box>
        </section>
    )
}
export default SearchedWords