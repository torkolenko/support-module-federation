import axios from "axios";

const axiosConfig = axios.create({
  timeout: 3000,
});

export { axiosConfig };
