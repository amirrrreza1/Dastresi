import axios from "axios";
import { SET_DAILY_OFFERS, SET_DAILY_OFFERS_LOADING, SET_DAILY_OFFERS_ERROR } from "./DailyOffersActionTypes";

const setDailyOffers = (data: any) => ({
  type: SET_DAILY_OFFERS,
  payload: data,
});

const setDailyOffersLoading = (loading: any) => ({
  type: SET_DAILY_OFFERS_LOADING,
  payload: loading,
});

const setDailyOffersError = (error: any) => ({
  type: SET_DAILY_OFFERS_ERROR,
  payload: error,
});

export function fetchDailyOffersData() {
  return async (dispatch: any) => {
    dispatch(setDailyOffersLoading(true));
    try {
      const res = await axios.get("http://localhost:3001/DailyOffers");
      dispatch(setDailyOffers(res.data));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطا در دریافت داده‌ها";
      dispatch(setDailyOffersError(errorMessage));
    } finally {
      dispatch(setDailyOffersLoading(false));
    }
  };
}