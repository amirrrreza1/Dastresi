import {
  SET_NEWLY_AVAILABLE,
  SET_NEWLY_AVAILABLE_LOADING,
  SET_NEWLY_AVAILABLE_ERROR,
} from "./NewlyAvailableActionType";

const initialState = {
  newlyAvailable: [],
  loading: true,
  error: "",
};

export const NewlyAvailableActionReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case SET_NEWLY_AVAILABLE:
      return {
        ...state,
        newlyAvailable: action.payload,
      };
    case SET_NEWLY_AVAILABLE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_NEWLY_AVAILABLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
