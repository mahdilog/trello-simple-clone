import React, { useState } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "../card";
import CardEditor from "../cardEditor";
import ListEditor from "../listEditor";

import { v4 } from "uuid";

const List = ({ list, index, dispatch }: any) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [addingCard, setAddingCard] = useState(false);

  const toggleAddingCard = () => setAddingCard(!addingCard);

  const addCard = async (cardText: any, description: any) => {
    const cardId = v4();
    if (cardText) {
      dispatch({
        type: "ADD_CARD",
        payload: { cardText, cardId, listId: list._id, description },
      });
      toggleAddingCard();
    }
  };

  const toggleEditingTitle = () => setEditingTitle(!editingTitle);

  const handleChangeTitle = (e: any) => setTitle(e.target.value);

  const editListTitle = async (e: any) => {
    toggleEditingTitle();
    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId: list._id, listTitle: title },
    });
  };

  const deleteList = async () => {
    if (!list.cards) {
      dispatch({
        type: "DELETE_LIST",
        payload: { listId: list._id, cards: list.cards },
      });
    } else {
      if (window.confirm("Are you sure to delete this list?")) {
        dispatch({
          type: "DELETE_LIST",
          payload: { listId: list._id, cards: list.cards },
        });
      }
    }
  };

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="w-80 bg-gray-300 p-2 rounded-xl h-max"
        >
          {editingTitle ? (
            <ListEditor
              list={list}
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />
          ) : (
            <div className="List-Title" onClick={toggleEditingTitle}>
              {list.title}
            </div>
          )}

          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <div
                ref={provided.innerRef}
                className="flex w-full flex-wrap gap-2 p-2"
              >
                {list.cards &&
                  list.cards.map((cardId: any, index: any) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={list._id}
                    />
                  ))}

                {provided.placeholder}

                {addingCard ? (
                  <CardEditor
                    onSave={addCard}
                    onCancel={toggleAddingCard}
                    adding
                  />
                ) : (
                  <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
                    Add a card
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state: any, ownProps: any) => ({
  list: state.listsById[ownProps.listId],
});

export default connect(mapStateToProps)(List);
