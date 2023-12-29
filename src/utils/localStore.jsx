import { jwtDecode } from "jwt-decode";
export const setLocal = (name, data) => {
  const dataJs = JSON.stringify(data);
  localStorage.setItem(name, dataJs);
};

export const getDataLocal = (name) => {
  const value = localStorage.getItem(name);

  //   JSON.parse(value) ? JSON.parse(value) : {};
  if (JSON.parse(value)) {
    return JSON.parse(value);
  } else {
    return null;
  }
};

export const getUserDataLocal = (name) => {
  const value = localStorage.getItem(name);

  var { data } = jwtDecode(JSON.parse(value)?.accessToken);
  // console.log(data);
  if (JSON.parse(value)) {
    return data;
  } else {
    return null;
  }
};
