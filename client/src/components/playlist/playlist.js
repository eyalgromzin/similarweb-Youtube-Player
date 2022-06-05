import React, { useEffect, useState } from "react";
import styles from './playlist.module.css';
import {addLinkToList} from '../../api'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


function Playlist({playlist, removeItem, onSwapItems}) {
  if(!playlist || playlist.length === 0){
    return <div>empy list</div>
  }

  const onDragEndHandle = (result) => {
    if(!result.destination) return 

    console.log(result)

    let sourceIndex = result.source.index
    let destinationIndex = result.destination.index

    onSwapItems(sourceIndex, destinationIndex)
  }

  return <div className={styles.playlist}>
    <h3>playlist</h3>

    <DragDropContext onDragEnd={onDragEndHandle}>
      <Droppable droppableId="videosList">
        {(provided) => <div className={styles.itemsContainer} {...provided.droppableProps} ref={provided.innerRef}>
            {
              playlist.length > 0 ? 
              playlist.map((item, i) => <Draggable key={item.itemId} draggableId={item.itemId} index={i}>
                {(provided) => 
                  <div className={styles.row}  key={i} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <span className={styles.dragButton}>im draggable </span>
                    <span className={styles.deleteButton} onClick={() => removeItem(item.itemId)}>X</span>
                    {item.name}
                  </div>
                }
                </Draggable>
              )
              :
              <div>empy list</div>
            }
            {provided.placeholder}
          </div>
        }
      </Droppable>
    </DragDropContext>
  </div>
}

export default Playlist;
