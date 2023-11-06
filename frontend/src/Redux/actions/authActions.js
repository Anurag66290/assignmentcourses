import { http } from "../../../config/axiosConfig";
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT_FAIL,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_PROFILE_FAIL,
  ADMIN_PROFILE_REQUEST,
  ADMIN_PROFILE_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
} from "../constants/authConstants";

export const loginAdmin = (Data) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });
    const {
      data: { body },
    } = await http.post("/user/loginAdmin", Data);
    // if (body) {
    //   localStorage.setItem("adminInfo", JSON.stringify(body));
    // }
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminProfileAction = (Data) => async (dispatch, getState) => {
  try {
    const {
      adminLogin: { adminInfo },
    } = getState();

    dispatch({
      type: ADMIN_PROFILE_REQUEST,
    });
    const {
      data: { body },
    } = await http(`/user/${Data}`, {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    });
    if (body) {
      localStorage.setItem("adminProfileInfo", JSON.stringify(body));
    }
    dispatch({
      type: ADMIN_PROFILE_SUCCESS,
      payload: body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminLogoutAction = () => async (dispatch, getState) => {
  try {
    const {
      adminLogin: { adminInfo },
    } = getState();
    const {
      data: { body },
    } = await http(`/user/logout`, {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    });
    dispatch({
      type: ADMIN_LOGOUT_SUCCESS,
      payload: body,
    });
    localStorage.removeItem("adminInfo");
    document.location.href = "/";
  } catch (error) {
    dispatch({
      type: ADMIN_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const forgotPasswordAction = (Data) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    const {
      data: { body },
    } = await http.post(`/forgot/forgotPassword`, Data);
    // if (body) {
    //   localStorage.setItem("OTP_TOKEN", JSON.stringify(body));
    // }
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: body,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
