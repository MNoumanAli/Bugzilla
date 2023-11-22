export const getLoggedUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const setLoggedUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};
export const deleteLoggedUser = () => {
  localStorage.clear();
};
