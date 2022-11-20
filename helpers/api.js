import axios from "axios";
import { BASE_URL } from "./constant";
import Swal from "sweetalert2";
export const get = async (params) => {
  let data;
  try {
    const res = await axios.get(BASE_URL, { params });
    data = res.data.results;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "An error is occured !!",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }

  return data;
};
