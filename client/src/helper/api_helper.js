import * as endPoint from './enpoint_helper'
import  { APIClient } from './api_method'

const api = new APIClient();

export const login = (data) =>  api.create(endPoint.LOGIN, data)

export const register = (data) =>  api.create(endPoint.REGISTER, data)

export const listPrice = () => api.get(endPoint.LIST_PRICES)

export const listMovies = (params) => api.get(endPoint.LIST_MOVIES, params)

export const createSubscription = (data) => api.create(endPoint.CREATE_SUBSCRIPTION, data)

export const confirmSubscription = (data) => api.create(endPoint.CONFIRM_SUBSCRIPTION, data)

export const getSubscriptionStatus = () => api.get(endPoint.SUBSCRIPTION_STATUS)
