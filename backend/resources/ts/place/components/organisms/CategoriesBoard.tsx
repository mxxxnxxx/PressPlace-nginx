import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { DragDropContext, Draggable, DraggableProvided, DraggingStyle, Droppable, DroppableProvided, DropResult, NotDraggingStyle } from 'react-beautiful-dnd'
import { useHistory } from 'react-router-dom'
import { useCategoryContext } from '../../../context/CategoryContext'
import CategoryColumn from '../../containers/organisms/CategoryColumn'
import { CategoriesArray } from '../../types/CategoriesArray'


const useStyle = makeStyles((theme) => ({
    categoryPlaces: {
        // 親要素を無視して横幅いっぱい使う
        // 解説 https://hirakublog.com/css-side-full-screen/
        marginRight: 'calc(50% - 50vw)',
        marginLeft: 'calc(50% - 50vw)',
        overflow: 'auto',
        height: '100%',
        display: 'flex',
        overflowAnchor: 'none'
    },
    categoryName: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1)
    },
}))

// ドラックしているときのスタイル
const getListStyle = (isDraggingOver: boolean) => ({

})
// ドラックしているときのスタイル
const getPlaceStyle = (
    isDragging: boolean,
    draggableStyle?: DraggingStyle | NotDraggingStyle
) => ({

})
const CategoriesBoard: React.FC = ({
}) => {
    const {
        categoriesState,
        handleDragEnd
    } = useCategoryContext()
    const classes = useStyle()
    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
        >
            <Droppable
                droppableId="all-columns"
                // type="column"
                direction="horizontal"
            >
                {(provided: DroppableProvided, snapshot) => (
                    <div
                        id="place-board"
                        className={classes.categoryPlaces}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {/* Categoryの領域 */}
                        {categoriesState?.map((category, index) => (
                            <div key={category.id}>
                                <Draggable
                                    draggableId={`category-${category.id}`}
                                    index={index}
                                >

                                    {(provided: DraggableProvided, snapshot) => (
                                        <div
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                        >
                                            <Typography
                                                {...provided.dragHandleProps}
                                                className={classes.categoryName}
                                                variant="h6" color="initial"
                                            >
                                                {category.name}
                                            </Typography>

                                            {/* placeのコンポーネント */}
                                            <CategoryColumn category={category} />

                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
export default CategoriesBoard
