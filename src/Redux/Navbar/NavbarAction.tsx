import axios from "axios";
import { SET_NAVBAR, SET_NAVBAR_LOADING, SET_NAVBAR_ERROR } from "./NavbarActionTypes";

const setNavbar = (data:any) => ({
  type: SET_NAVBAR,
  payload: data,
});

const setNavbarLoading = (loading:any) => ({
  type: SET_NAVBAR_LOADING,
  payload: loading,
});

const setNavbarError = (error:any) => ({
  type: SET_NAVBAR_ERROR,
  payload: error,
});

export const fetchNavbarData = () => async (dispatch:any) => {
  dispatch(setNavbarLoading(true));
  try {
    const res = await axios.get(
      "https://amirrrreza1.github.io/Dastresi-Link/db.json"
    );
    dispatch(setNavbar(res.data.Navbar));
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "خطا در دریافت داده‌ها";
    dispatch(setNavbarError(errorMessage));
  } finally {
    dispatch(setNavbarLoading(false));
  }
};