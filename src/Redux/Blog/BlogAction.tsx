import axios from "axios";
import { SET_BLOG, SET_BLOG_LOADING, SET_BLOG_ERROR } from "./BlogActionTypes";

type BlogItem = {
  id: string;
  src: string;
  alt: string;
  text: string;
};

const setBlog = (data: BlogItem[]) => ({
  type: SET_BLOG,
  payload: data,
});

const setBlogLoading = (loading: boolean) => ({
  type: SET_BLOG_LOADING,
  payload: loading,
});

const setBlogError = (error: string) => ({
  type: SET_BLOG_ERROR,
  payload: error,
});

export function fetchBlogData() {
  return async (dispatch: any) => {
    dispatch(setBlogLoading(true));
    try {
      const res = await axios.get("http://localhost:3001/Blog");
      dispatch(setBlog(res.data));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطا در دریافت داده‌ها";
      dispatch(setBlogError(errorMessage));
    } finally {
      dispatch(setBlogLoading(false));
    }
  };
}
