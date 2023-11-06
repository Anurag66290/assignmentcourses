import {
  GET_CMS_FAIL,
  GET_CMS_REQUEST,
  GET_CMS_SUCCESS,
} from "../constants/cmsConstants";

export const getAllCmsReducer = (state = { cms: [] }, action) => {
  switch (action.type) {
    case GET_CMS_REQUEST:
      return { loading: true };
    case GET_CMS_SUCCESS:
      return {
        ...state,
        loading: false,
        Cms: action.payload,
      };
    case GET_CMS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
