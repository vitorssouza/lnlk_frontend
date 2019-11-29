export function setLoggedUser(name, profileId) {
  return {
    type: "SET_LOGGED_USER",
    name,
    profileId
  };
}
