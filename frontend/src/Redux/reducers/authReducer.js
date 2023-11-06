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

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PROFILE_REQUEST:
      return { loading: true };
    case ADMIN_PROFILE_SUCCESS:
      return { loading: false, adminProfile: action.payload };
    case ADMIN_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGOUT_SUCCESS:
      return { status: true, adminLogout: action.payload };
    case ADMIN_LOGOUT_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { loading: false, OTP_TOKEN: action.payload };
    case FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
