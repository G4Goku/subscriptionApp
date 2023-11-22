import axios from "axios";
import * as endPoint from './enpoint_helper'
const url = process.env.REACT_APP_BASE_URL

export const login = (data) =>  axios.post(url+endPoint.LOGIN,data)

export const register = (data) =>  axios.post(url+endPoint.REGISTER,data)