import axios from 'axios'
import { API_ROOT } from '../utils/constans.js'

export const signupAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/api/auth/signup`, data)
  return response.data
}

export const signinAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/api/auth/signin`, data)
  return response.data
}

export const signinWithGoogleAPI = async(data) => {
  const response = await axios.post(`${API_ROOT}/api/auth/google`, data)
  return response.data
}
