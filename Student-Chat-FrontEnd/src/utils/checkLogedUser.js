import jwt_decode from "jwt-decode";

const checkLogedUser = () => {
  if (localStorage.getItem("std-profile") === null) {
    return false;
  } else {
    let profile = JSON.parse(localStorage.getItem("std-profile"));
    let decodedToken = jwt_decode(profile.token);
    if (Date.now() >= decodedToken.exp * 1000) {
      return false;
    } else {
      return true;
    }
  }
};

export default checkLogedUser;
