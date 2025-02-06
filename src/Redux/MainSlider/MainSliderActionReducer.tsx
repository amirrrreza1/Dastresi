import { SET_MAIN_SLIDER, SET_MAIN_SLIDER_LOADING, SET_MAIN_SLIDER_ERROR } from "./MainSliderActionTypes";

const initialState  = {
  mainSlider: [],
  loading: true,
  error: "",
};

export const MainSliderActionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MAIN_SLIDER:
      return {
        ...state,
        mainSlider: action.payload,
      };
    case SET_MAIN_SLIDER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_MAIN_SLIDER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};