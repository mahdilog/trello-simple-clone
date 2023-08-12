import React, { useState } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import CardEditor from "../cardEditor";
import { Dispatch } from "redux";

const Card = ({
  card,
  dispatch,
  listId,
  index,
}: {
  card: {
    description: string;
    text: string;
    _id: string;
  };
  dispatch: Dispatch;
  listId: string;
  index: number;
}) => {
  const [editing, setEditing] = useState(false);

  const startEditing = () => {
    setEditing(true);
  };
  const endEditing = () => {
    setEditing(false);
  };

  const editCard = async (title: string, description: string) => {
    if (title) {
      endEditing();
      dispatch({
        type: "CHANGE_CARD_TEXT",
        payload: {
          cardId: card._id,
          cardText: title,
          description: description,
        },
      });
    } else {
      if (window.confirm("Are you sure to delete this card?")) {
        dispatch({
          type: "DELETE_CARD",
          payload: { cardId: card._id, listId },
        });
      }
    }
  };

  const deleteCard = async () => {
    if (window.confirm("Are you sure to delete this card?")) {
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId },
      });
    }
  };

  if (!editing) {
    return (
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex flex-wrap w-full border-b-[1px] bg-white rounded p-2"
          >
            <p className="w-full" onClick={() => console.log("modal")}>
              =
            </p>
            <div onClick={startEditing}>
              <p className="w-full text-base font-medium break-words whitespace-pre-line">
                {card.text}
              </p>
              <p className="text-sm break-words whitespace-pre-line">
                {card?.description}
              </p>
            </div>
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <>
        <CardEditor
          cardText={card.text}
          cardDescription={card?.description}
          onSave={editCard}
          onDelete={deleteCard}
          onCancel={endEditing}
        />
      </>
    );
  }
};

const mapStateToProps = (state: any, ownProps: any) => ({
  card: state.cardsById[ownProps.cardId],
});

export default connect(mapStateToProps)(Card);
