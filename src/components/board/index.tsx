import React, { useState } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "../list";
import AddList from "../addList";

const Board = (props: any) => {
  const [addingList, setAddingList] = useState(false);

  const toggleAddingList = () => {
    setAddingList(!addingList);
  };

  const handleDragEnd = ({ source, destination, type }: any) => {
    if (!destination) return;

    const { dispatch } = props;

    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        dispatch({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index,
          },
        });
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided, _snapshot) => (
          <div className="flex flex-row gap-3 p-3" ref={provided.innerRef}>
            {props.board.lists.map((listId: any, index: any) => (
              <List listId={listId} key={listId} index={index} />
            ))}

            {provided.placeholder}

            <div className="bg-blue-400 h-10 w-fit p-2 rounded-md">
              {addingList ? (
                <AddList toggleAddingList={toggleAddingList} />
              ) : (
                <div onClick={toggleAddingList} className="cursor-pointer">
                  Add a list
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = (state: any) => ({ board: state.board });

export default connect(mapStateToProps)(Board);
