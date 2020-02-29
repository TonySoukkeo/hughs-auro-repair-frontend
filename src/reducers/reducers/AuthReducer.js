import { SET_AUTH } from "../constants/AuthConstants";

const authInitialState = {
  isAuth: false,
  token: "",
  user: {}
};

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        token: action.payload.token,
        user: action.payload.user
      };

    default:
      return;
  }
};

export { authInitialState, authReducer };
