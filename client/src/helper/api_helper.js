import axios from "axios";
import * as endPoint from './enpoint_helper'
import  { APIClient } from './api_method'
const url = process.env.REACT_APP_BASE_URL

const api = new APIClient();

export const login = (data) =>  axios.post(url+endPoint.LOGIN,data)

export const register = (data) =>  axios.post(url+endPoint.REGISTER,data)

export const listPrice = (data) => api.get(endPoint.LIST_PRICES,data)