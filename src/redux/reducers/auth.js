const initialState = {
  user  : null,
  token : null,
  tokens: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "auth/change":
      const { token, refreshToken, user } = action.payload;

      return {
        ...state,
        user,
        token : token,
        tokens: [token, refreshToken],
      };
    case "auth/me":
      return {
        ...state,
        user: action.payload,
      };
    case "auth/change_like_list":
      return {
        ...state,
        user: state.user ?  {
          ...state.user,
          likeList:action.payload
        } : null,
      };
    case "auth/logout":
      return initialState;
    default:
      return state;
  }
};

export default auth;
