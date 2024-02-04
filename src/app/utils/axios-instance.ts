import axios from "axios";
import { redirect } from "next/navigation";
import { getCookieByName } from "./get-cookies";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getCookieByName('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if ('response' in error) {
      switch (error.response.status) {
        case 401:
          return redirect('user/login')
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
