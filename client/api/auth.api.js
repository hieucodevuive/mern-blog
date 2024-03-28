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

export const updateUserAPI = async(userId, data) => {
  const response = await axios.put(`${API_ROOT}/api/user/update/${userId}`, data)
  return response.data
}

export const deleteUserAPI = async(userId) => {
  const response = await axios.delete(`${API_ROOT}/api/user/delete/${userId}`)
  return response.data
}

export const signoutAPI = async() => {
  const response = await axios.post(`${API_ROOT}/api/user/signout`)
  return response.data
}

