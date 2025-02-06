import {
  SET_BLOG,
  SET_BLOG_LOADING,
  SET_BLOG_ERROR,
} from "./BlogActionTypes";

const initialState = {
  blog: [],
  loading: true,
  error: "",
};

export const BlogActionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_BLOG:
      return {
        ...state,
        blog: action.payload,
      };
    case SET_BLOG_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_BLOG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};