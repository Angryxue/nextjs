import axios from "axios";
import baseURL from "@/servicePath.js";
// 创建axios实例
const service = axios.create({
  timeout: 10000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response);
  },
);

export const request = (url, methods, data, requestType, headers) => {
  if (methods === "get") {
    return service({
      baseURL: requestType ? null : baseURL,
      url,
      method: methods,
      params: data ? data : {},
      headers: headers ? headers : null,
    });
  } else {
    return service({
      baseURL: requestType ? null : baseURL,
      url,
      method: methods,
      data,
      headers: headers ? headers : null,
    });
  }
};
