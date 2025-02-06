import { SET_MOST_SELL, SET_MOST_SELL_LOADING, SET_MOST_SELL_ERROR } from "./MostSellActionType";

const initialState  = {
  mostSell: [],
  loading: true,
  error: "",
};

export const MostSellActionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MOST_SELL:
      return {
        ...state,
        mostSell: action.payload,
      };
    case SET_MOST_SELL_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_MOST_SELL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};