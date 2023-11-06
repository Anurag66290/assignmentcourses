import { http } from "../../../config/axiosConfig";
import {
  GET_CMS_FAIL,
  GET_CMS_REQUEST,
  GET_CMS_SUCCESS,
} from "../constants/cmsConstants";

export const getCmsAction = () => async (dispatch, getState) => {
  try {
    const {
      adminLogin: { adminInfo },
    } = getState();
    dispatch({
      type: GET_CMS_REQUEST,
    });
    const {
      data: { body },
    } = await http("/cms/getAllCms", {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    });
    dispatch({
      type: GET_CMS_SUCCESS,
      payload: body,
    });
  } catch (error) {
    dispatch({
      type: GET_CMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
