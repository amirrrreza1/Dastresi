import {
  SET_BRANDS,
  SET_BRANDS_LOADING,
  SET_BRANDS_ERROR,
} from "./BrandsActionTypes";

const initialState = {
  brands: [],
  loading: true,
  error: "",
};

export const BrandsActionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case SET_BRANDS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_BRANDS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};