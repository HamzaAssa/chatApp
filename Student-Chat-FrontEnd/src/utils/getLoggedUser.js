import jwt_decode from "jwt-decode";

const getLogedUser = () => {
  if (localStorage.getItem("std-profile") === null) {
    return null;
  } else {
    let profile = JSON.parse(localStorage.getItem("std-profile")).user;
    let decodedToken = jwt_decode(profile.token);
    if (Date.now() >= decodedToken.exp * 1000) {
      return null;
    } else {
      return profile;
    }
  }
};

export default getLogedUser;
