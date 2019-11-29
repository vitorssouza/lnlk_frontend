const INITIAL_STATE = {};

export default function user(state = INITIAL_STATE, action) {
  if (action.type === "SET_LOGGED_USER") {
    state = {
      profileId: action.profileId,
      name: action.name
    };
  }
  return state;
}
