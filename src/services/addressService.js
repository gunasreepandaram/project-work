// authentication related API calls
// signup, signin, forgot password

import axiosInstance from "../apis/axiosInstance"
import { API_END_POINTS } from "../constants/endPoints"

export const addressAddApi = async (data) =>{
    return await axiosInstance.post(API_END_POINTS.ADDRESS_ADD, data)
}

export const addressViewApi = async (data) =>{
    return await axiosInstance.post(API_END_POINTS.ADDRESS_VIEW, data)
}

export const addressDeleteApi = async (data) =>{
    return await axiosInstance.post(API_END_POINTS.ADDRESS_DELETE, data)
}
