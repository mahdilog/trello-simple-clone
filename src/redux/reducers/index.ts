import { combineReducers } from "redux";
import { board } from "./boardReducers";
import { listsById } from "./listReducers";
import { cardsById } from "./cardReducers";

export const reducers = combineReducers({
  board,
  listsById,
  cardsById,
});
