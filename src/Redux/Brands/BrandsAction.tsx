import axios from "axios";
import { SET_BRANDS, SET_BRANDS_LOADING, SET_BRANDS_ERROR } from "./BrandsActionTypes";

const setBrands = (data: any) => ({
  type: SET_BRANDS,
  payload: data,
});

const setBrandsLoading = (loading: any) => ({
  type: SET_BRANDS_LOADING,
  payload: loading,
});

const setBrandsError = (error: any) => ({
  type: SET_BRANDS_ERROR,
  payload: error,
});

export function fetchBrandsData() {
  return async (dispatch: any) => {
    dispatch(setBrandsLoading(true));
    try {
      const res = await axios.get(
        "https://amirrrreza1.github.io/Dastresi-Link/db.json"
      );
      dispatch(setBrands(res.data.Brands));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطا در دریافت داده‌ها";
      dispatch(setBrandsError(errorMessage));
    } finally {
      dispatch(setBrandsLoading(false));
    }
  };
}