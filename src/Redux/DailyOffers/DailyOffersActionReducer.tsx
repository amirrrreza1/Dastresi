import { SET_DAILY_OFFERS, SET_DAILY_OFFERS_LOADING, SET_DAILY_OFFERS_ERROR } from "./DailyOffersActionTypes";

const initialState  = {
  dailyOffers: [],
  loading: true,
  error: "",
};

export const DailyOffersActionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DAILY_OFFERS:
      return {
        ...state,
        dailyOffers: action.payload,
      };
    case SET_DAILY_OFFERS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_DAILY_OFFERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};