import { http } from "../../../config/axiosConfig";
import {
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../constants/userConstants";
import queryString from "query-string";

export const getAllUsersAction = (query) => async (dispatch, getState) => {
  try {
    const {
      adminLogin: { adminInfo },
    } = getState();
    dispatch({
      type: GET_ALL_USERS_REQUEST,
    });
    const {
      data: {
        body: { users, total, totalAdmin },
      },
    } = await http(`/user/getUsers?${queryString.stringify(query)}`, {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    });
    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: { users, total, totalAdmin },
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserAction = (id) => async (dispatch, getState) => {
  try {
    const {
      adminLogin: { adminInfo },
    } = getState();
    dispatch({
      type: GET_USER_REQUEST,
    });
    const {
      data: { body },
    } = await http(`/user/getUser/${id}`, {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    });
    dispatch({
      type: GET_USER_SUCCESS,
      payload: body,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
