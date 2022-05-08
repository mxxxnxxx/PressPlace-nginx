import { Card, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { useCategoryContext } from '../../../context/CategoryContext'
import EnhancedAddCategoryButton from '../../../user/containers/atoms/AddCategoryButton'
import EnhancedCategoryDeleteButton from '../../containers/atoms/CategoryDeleteButton'
import CategoryColumn from '../../containers/organisms/CategoryColumn'


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
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(3)
    },
    categoryCard: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(255,255,255,0.9)',
        margin: theme.spacing(2),
    }
}))

const CategoriesBoard: React.FC = ({
}) => {
    const {
        categoriesState,
        handleDragEnd
    } = useCategoryContext()
    const classes = useStyle()
    return (
        <div >
            <DragDropContext
                onDragEnd={handleDragEnd}
            >
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                >
                    {(provided: DroppableProvided) => (
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
                                        draggableId={`category-${category.name}`}
                                        index={index}
                                    >

                                        {(provided: DraggableProvided) => (
                                            <div
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                            >
                                                <Card className={classes.categoryCard}>
                                                    <EnhancedCategoryDeleteButton
                                                        provided={provided}
                                                        category={category}
                                                    />
                                                    <Typography
                                                        {...provided.dragHandleProps}
                                                        className={classes.categoryName}
                                                        variant="h6" color="initial"
                                                    >
                                                        {category.name}
                                                    </Typography>

                                                    {/* placeのコンポーネント */}
                                                    <CategoryColumn category={category} />

                                                </Card>
                                            </div>
                                        )}
                                    </Draggable>
                                </div>
                            ))}
                            {provided.placeholder}
                            <EnhancedAddCategoryButton />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </div>
    )
}
export default CategoriesBoard
