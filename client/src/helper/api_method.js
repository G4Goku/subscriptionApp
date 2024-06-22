import axios from "axios";

const setUrl = (path) => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
    if (path) {
      axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}${path}` 
    }
  }

class APIClient {

    get = (path, data, params) => {
      setUrl(path);
      let response;
      let paramKeys;
      const authToken = localStorage.getItem("authToken")
        ? localStorage.getItem("authToken")
        : null;
      if (authToken) axios.defaults.headers.common["x-auth-token"] = authToken;  
      if (params) {
        Object.keys(params).map((key) => {
          paramKeys.push(key + "=" + params[key]);
          return paramKeys;
        });
        const queryString =
          paramKeys && paramKeys.length ? paramKeys.join("&") : "";
        response = axios.get(`${process.env.REACT_APP_BASE_URL}/${path}?${queryString}`, params);
      } else if (data) {
        response = axios.get('/', data);
      } else{
        response = axios.get();
      }
      return response;
    };
  
    /**
     * post given data to url
     */
    create = (url, data, path) => {
      setUrl(path);
      const authToken = JSON.parse(localStorage.getItem("authUser"))
        ? JSON.parse(localStorage.getItem("authUser")).result.token
        : null;
      if (authToken) axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
      return axios.post(url, data);
    };
  
    /**
     * Updates data
     */
    update = (url, data, path) => {
      setUrl(path);
      const authToken = JSON.parse(localStorage.getItem("authUser"))
        ? JSON.parse(localStorage.getItem("authUser")).result.token
        : null;
      if (authToken) axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
      console.log("api helper", data);
      return axios.patch(url, data);
    };
  
    /**
     * Delete
     */
    delete = (url, config) => {
      const authToken = JSON.parse(localStorage.getItem("authUser"))
        ? JSON.parse(localStorage.getItem("authUser")).result.token
        : null;
  
      if (authToken) axios.defaults.headers.common["x-auth-token"] = authToken;
      return axios.delete(url, { ...config });
    };
  }

  export { APIClient }