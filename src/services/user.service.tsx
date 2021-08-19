import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://rails-to-do-list-narola.herokuapp.com/v1/todos?limit=10&offset=0&sort_by=id&sort_direction=asc";

const api_url = "https://rails-to-do-list-narola.herokuapp.com/v1/todos?limit=10&offset=0&sort_by=priority&sort_direction=desc";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getAddData = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const DeleteData = (id: any) => {
  return axios.delete(`https://rails-to-do-list-narola.herokuapp.com/v1/todos/${id}`, { headers: authHeader() });
};

const sorting = () => {
  return axios.get(api_url , { headers: authHeader() });
};

export default {
  getPublicContent,
  getAddData,
  DeleteData,
  sorting,
};