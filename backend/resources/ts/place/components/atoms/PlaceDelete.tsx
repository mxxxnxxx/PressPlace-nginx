import React from 'react';
import {
    Modal,
    Box,
    Button,
    MenuItem,
    ListItemIcon,
    Container,
    Card,
    CardHeader,
    CardContent,
    useTheme,
    CardActions,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import useDeletePlaceQuery from '../../hooks/useDeletePlace';
import DeleteIcon from '@material-ui/icons/Delete';
import { Place } from '../../types/Place';
type Props = {
    deleteModalOn: boolean
    setDeleteModalOn: (boolean: boolean) => void
    place: Place
}
const PlaceDelete: React.FC<Props> = ({
    deleteModalOn,
    setDeleteModalOn,
    place,
}) => {
    const deletePlaceQuery = useDeletePlaceQuery();
    const theme = useTheme();
    return (
        <>
            <MenuItem>
                <Button
                    onClick={() => setDeleteModalOn(true)}
                    startIcon={<DeleteForeverIcon />}
                >
                    削除
                </Button>
            </MenuItem>

            {/* 以下からモーダル */}
            <Modal
                open={deleteModalOn}
                onClose={() => setDeleteModalOn(false)}
            >
                <Container maxWidth="xs" >
                    <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
                        <CardHeader title="Placeの削除をしますか?" style={{ textAlign: 'center', marginTop: 30 }} />
                        <CardActions style={{ justifyContent: 'center', marginBottom: 30 }}>
                            <Button
                                onClick={() => deletePlaceQuery.mutate(place.id)}
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                            >
                                削除
                            </Button>
                        </CardActions>
                    </Card>
                </Container>
            </Modal>
        </>
    )
}
export default PlaceDelete