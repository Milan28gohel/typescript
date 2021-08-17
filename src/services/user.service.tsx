import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://rails-to-do-list-narola.herokuapp.com/v1/todos?limit=10&offset=0&sort_by=id&sort_direction=desc";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getAddData= () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getAddData,
  getModeratorBoard,
  getAdminBoard,
};