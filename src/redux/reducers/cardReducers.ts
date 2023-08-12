export const cardsById = (state: any = {}, action: any) => {
  switch (action.type) {
    case "ADD_CARD": {
      const { cardText, cardId, description } = action.payload;
      return {
        ...state,
        [cardId]: { text: cardText, _id: cardId, description: description },
      };
    }
    case "CHANGE_CARD_TEXT": {
      const { cardText, cardId, description } = action.payload;
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          text: cardText,
          description: description,
        },
      };
    }
    case "DELETE_CARD": {
      const { cardId } = action.payload;
      const { [cardId]: deletedCard, ...restOfCards } = state;
      return restOfCards;
    }
    case "DELETE_LIST": {
      const { cards: cardIds } = action.payload;
      return Object.keys(state)
        .filter((cardId) => !cardIds.includes(cardId))
        .reduce(
          (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
          {}
        );
    }
    default:
      return state;
  }
};
