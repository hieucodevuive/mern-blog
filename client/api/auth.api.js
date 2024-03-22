import axios from 'axios'
import { API_ROOT } from '../utils/constans.js'

export const signupAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/api/auth/signup`, data)
  return response.data
}