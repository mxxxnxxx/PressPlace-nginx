import {
    Avatar, Backdrop, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Typography, Box, makeStyles
} from '@material-ui/core';
import { AxiosError } from 'axios';
import React, { FC, useState } from 'react';
import Header from '../../../layout/containers/organisms/Header';
import SearchedWords from '../molecules/SearchedWords';
import MenuButton from '../../components/molecules/MenuButton';
import { useTheme } from '@material-ui/core/styles';
import { Place } from '../../types/Place';
import { Places } from '../../types/Places';
import { Inputs } from '../../types/Inputs';
import PageNextBack from './PageNextBack';
import Footer from '../../../layout/components/organisms/Footer';


type Props = {
    places?: Places
    page: number
    setPage: (old: any) => void
    isLoading: boolean
    error: AxiosError<any> | null
    data?: Places
    isPreviousData: boolean
    InputsData?: Inputs
    removeKey: (key: string) => void
};

const useStyle = makeStyles(() => ({
    noSearched: {
        textAlign: 'center',
        color: 'red',
    },
    nextBack: {
        textAlign: 'center',
    }
}))

const PlaceSearched: FC<Props> = ({
    places,
    page,
    setPage,
    isLoading,
    error,
    data,
    isPreviousData,
    InputsData,
    removeKey,

}) => {
    const theme = useTheme()
    const classes = useStyle()
    return (
        <section>
            <Header />
            <SearchedWords places={places} InputsData={InputsData} removeKey={removeKey} />
            {places?.total === 0 &&
                <Box
                    className={classes.noSearched}
                >
                    検索結果が見つかりませんでした
                </Box>
            }
            {places?.total && <PageNextBack
                page={page}
                setPage={setPage}
                isPreviousData={isPreviousData}
                places={places}
            />}
            {places?.data?.map((place: Place, index) => (
                <Card className='m-3' key={index.toString()}>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="Recipe"
                                src={`user_image/${place.user.userImage}`}
                            />
                        }
                        action={
                            <MenuButton place={place} />
                        }
                        title={place.user.name}
                    />
                    {place.placeImages[0] ?

                        <CardMedia
                            title="Paella dish"
                        >
                            <img
                                src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${place.placeImages[0].imagePath}`}
                                style={{ height: 200 }}
                            />
                        </CardMedia>
                        :
                        <Typography>
                            画像は投稿されていません
                        </Typography>

                    }
                    <CardContent>
                        <Typography variant="subtitle1" color="initial">
                            場所の名前
                        </Typography>

                        <Typography paragraph>
                            {place.name}
                        </Typography>

                        <Typography variant="subtitle1" color="initial">
                            住所
                        </Typography>

                        <Typography paragraph>
                            {place.address}
                        </Typography>

                        <Typography variant="subtitle1" color="initial">
                            コメント
                        </Typography>

                        <Typography>
                            {place.comment}
                        </Typography>

                        <Typography>
                            {place.createdAt}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {places?.total && <PageNextBack
                page={page}
                setPage={setPage}
                isPreviousData={isPreviousData}
                places={places}
            />}
            <Footer />
            <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </section>
    );
};

export default PlaceSearched;
