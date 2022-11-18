import axios from "axios";
import { BASE_URL } from "./constant";

export const get = async (params) => {
  let data;
  try {
    const res = await axios.get(BASE_URL, { params });
    data = res.data.results;
  } catch (error) {
    console.log(error.response);
  }

  return data;
};
