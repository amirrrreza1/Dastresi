import axios from "axios";
import { SET_MAIN_SLIDER, SET_MAIN_SLIDER_LOADING, SET_MAIN_SLIDER_ERROR } from "./MainSliderActionTypes";

const setMainSlider = (data: any) => ({
  type: SET_MAIN_SLIDER,
  payload: data,
});

const setMainSliderLoading = (loading: any) => ({
  type: SET_MAIN_SLIDER_LOADING,
  payload: loading,
});

const setMainSliderError = (error: any) => ({
  type: SET_MAIN_SLIDER_ERROR,
  payload: error,
});

export function fetchMainSliderData() {
  return async (dispatch: any) => {
    dispatch(setMainSliderLoading(true));
    try {
      const res = await axios.get(
        "https://amirrrreza1.github.io/Dastresi-Link/db.json"
      );
      dispatch(setMainSlider(res.data.MainSlider));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطا در دریافت داده‌ها";
      dispatch(setMainSliderError(errorMessage));
    } finally {
      dispatch(setMainSliderLoading(false));
    }
  };
}