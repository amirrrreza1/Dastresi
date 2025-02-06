import axios from "axios";
import {
  SET_NEWLY_AVAILABLE,
  SET_NEWLY_AVAILABLE_LOADING,
  SET_NEWLY_AVAILABLE_ERROR,
} from "./NewlyAvailableActionType";

const setNewlyAvailable  = (data: any) => ({
  type: SET_NEWLY_AVAILABLE,
  payload: data,
});

const setNewlyAvailableLoading  = (data: any) => ({
  type: SET_NEWLY_AVAILABLE_LOADING,
  payload: data,
});

const setNewlyAvailableError  = (data: any) => ({
  type: SET_NEWLY_AVAILABLE_ERROR,
  payload: data,
});

export function fetchNewlyAvailableData() {
  return async (dispatch: any) => {
    dispatch(setNewlyAvailableLoading(true));
    try {
      const res = await axios.get("http://localhost:3001/NewlyAvailable");
      dispatch(setNewlyAvailable(res.data));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطا در دریافت داده‌ها";
      dispatch(setNewlyAvailableError(errorMessage));
    } finally {
      dispatch(setNewlyAvailableLoading(false));
    }
  };
}