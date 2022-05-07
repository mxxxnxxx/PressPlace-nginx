import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Draggable, DraggableProvided, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd'
import { Category } from '../../types/Category'
import { Place } from '../../types/Place'
import PlaceAccordion from './PlaceAccordion'
type Props = {
    category: Category
}
const useStyle = makeStyles((theme) => ({
    droppable: {
        padding: theme.spacing(2),
        borderRadius: '6px',
        background: 'rgba(211,211,211,0.8)',
        width: '300px',
        flexShrink: 0,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(10),
    },
    placeContainer: {
        marginBottom: theme.spacing(2)
    },
}))

const CategoryColumn: React.FC<Props> = ({
    category
}) => {
    const classes = useStyle()
    return (
        <Droppable
            droppableId={`${category.id}`}
            type="place"
        >
            {(prov, snapshot) => (

                <div
                    className={classes.droppable}
                    ref={prov.innerRef}
                    {...prov.droppableProps}
                >
                    {/* placesの領域 */}
                    {category.places?.map((place: Place, index) => (
                        <div key={place.id.toString()}>
                            <Draggable
                                draggableId={`place-${place.id}`}
                                index={index}
                            >
                                {(provided: DraggableProvided) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        className={classes.placeContainer}
                                    >
                                        <PlaceAccordion place={place} />
                                    </div>
                                )}
                            </Draggable>
                        </div>
                    ))}
                    {prov.placeholder}

                </div>
            )}
        </Droppable>
    )
}
export default CategoryColumn
