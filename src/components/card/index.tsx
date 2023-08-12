import React, { useState } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import CardEditor from "../cardEditor";

const Card = (props: any) => {
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  const startHover = () => setHover(true);
  const endHover = () => setHover(false);
  const startEditing = () => {
    setHover(false);
    setEditing(true);
  };
  const endEditing = () => {
    setHover(false);
    setEditing(false);
  };

  const editCard = async (title: any, description: any) => {
    const { card, dispatch } = props;
    endEditing();
    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: {
        cardId: card._id,
        cardText: title,
        description: description,
      },
    });
  };

  const deleteCard = async () => {
    const { listId, card, dispatch } = props;
    if (window.confirm("Are you sure to delete this card?")) {
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId },
      });
    }
  };

  const { card, index } = props;

  if (!editing) {
    return (
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="flex flex-wrap w-full border-b-[1px] bg-white rounded p-2"
            onMouseEnter={startHover}
            onMouseLeave={endHover}
            onClick={startEditing}
          >
            <p className="w-full border-b-2 border-gray-400 text-base font-medium break-words whitespace-pre-line">
              {card.text}
            </p>
            <p className="w-full text-sm break-words whitespace-pre-line">
              {card?.description}
            </p>
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <>
        <CardEditor
          text={card.text}
          description={card?.description}
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
