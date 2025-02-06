import { SET_NAVBAR, SET_NAVBAR_LOADING, SET_NAVBAR_ERROR } from "./NavbarActionTypes";

const initialState = {
  navbar: [],
  loading: false,
  error: "",
};

export const NavbarActionReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case SET_NAVBAR:
      return {
        ...state,
        navbar: action.payload,
      };
    case SET_NAVBAR_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_NAVBAR_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};