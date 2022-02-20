import { Button, Card, CardActions, CardHeader, Container, useTheme } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'
import Loding from '../../../layout/components/pages/Loding'

type Props = {
    placeId: number
    placeDelete: (placeId: number) => void
    isLoading: boolean
    forwardRef?: React.Ref<HTMLDivElement>
}
const PlaceDeleteModal: React.FC<Props> = ({
    placeId,
    placeDelete,
    isLoading,
    forwardRef
}) => {

    const theme = useTheme()
    return (
        <div ref={forwardRef}>
            <Container maxWidth="xs" >
                <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
                    <CardHeader title="Placeの削除をしますか?" style={{ textAlign: 'center', marginTop: 30 }} />
                    <CardActions style={{ justifyContent: 'center', marginBottom: 30 }}>
                        <Button
                            onClick={() => placeDelete(placeId)}
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                        >
                            削除
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </div>
    )
}
export default PlaceDeleteModal
