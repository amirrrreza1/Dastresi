import axios from "axios";
import { SET_CATEGORIES, SET_CATEGORIES_LOADING, SET_CATEGORIES_ERROR } from "./CategoriesActionTypes";

const setCategories = (data: any) => ({
  type: SET_CATEGORIES,
  payload: data,
});

const setCategoriesLoading = (loading: any) => ({
  type: SET_CATEGORIES_LOADING,
  payload: loading,
});

const setCategoriesError = (error: any) => ({
  type: SET_CATEGORIES_ERROR,
  payload: error,
});

export function fetchCategoriesData() {
  return async (dispatch: any) => {
    dispatch(setCategoriesLoading(true));
    try {
      const res = await axios.get(
        "https://amirrrreza1.github.io/Dastresi-Link/db.json"
      );
      dispatch(setCategories(res.data.Categories));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطا در دریافت داده‌ها";
      dispatch(setCategoriesError(errorMessage));
    } finally {
      dispatch(setCategoriesLoading(false));
    }
  };
}