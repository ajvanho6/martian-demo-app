import axios from "axios"
import Config from "../config"

const axiosInstance = axios.create({
  baseURL: Config.BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Auth": Config.TOKEN
  }
})

export default axiosInstance
