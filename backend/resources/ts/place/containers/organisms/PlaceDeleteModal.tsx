import React, { useRef } from "react"
import { useHistory, useLocation } from "react-router"
import Loding from "../../../layout/components/pages/Loding"
import PlaceDeleteModal from "../../components/organisms/PlaceDeleteModal"
import useDeletePlaceQuery from '../../hooks/useDeletePlaceMutation'

type Props = {
    placeId: number
    handleClose: () => void
}
const EnhancedPlaceDeleteModal = React.forwardRef<HTMLDivElement, Props>(
    ({ placeId, handleClose }, ref) => {
        const { isLoading, mutate } = useDeletePlaceQuery()
        const placeDelete = (placeId: number) => {
            mutate(placeId, {
                onSuccess: () => {
                    handleClose()
                }
            }
            );
        }
        if (isLoading) {
            return <Loding isLoading={isLoading} />
        }
        return (
            <PlaceDeleteModal
                placeId={placeId}
                placeDelete={placeDelete}
                isLoading={isLoading}
                forwardRef={ref}
            />
        )
    }
)
export default EnhancedPlaceDeleteModal
