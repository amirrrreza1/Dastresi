import axios from "axios";
import { SET_MOST_SELL, SET_MOST_SELL_LOADING, SET_MOST_SELL_ERROR } from "./MostSellActionType";

const  setMostSell = (data: any) => ({
  type: SET_MOST_SELL,
  payload: data,
});

const setMostSellLoading = (loading: any) => ({
  type: SET_MOST_SELL_LOADING,
  payload: loading,
});

const setMostSellError = (error: any) => ({
  type: SET_MOST_SELL_ERROR,
  payload: error,
});

export function fetchMostSellData() {
  return async (dispatch: any) => {
    dispatch(setMostSellLoading(true));
    try {
      const res = await axios.get("http://localhost:3001/MostSell");
      dispatch(setMostSell(res.data));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطا در دریافت داده‌ها";
      dispatch(setMostSellError(errorMessage));
    } finally {
      dispatch(setMostSellLoading(false));
    }
  };
}