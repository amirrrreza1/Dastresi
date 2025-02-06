import {
  SET_CATEGORIES,
  SET_CATEGORIES_LOADING,
  SET_CATEGORIES_ERROR,
} from "./CategoriesActionTypes";

const initialState = {
  categories: [],
  loading: true,
  error: "",
};

export const CategoriesActionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_CATEGORIES_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
