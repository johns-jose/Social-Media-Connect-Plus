// import axios from "axios";
// // const baseURL = 'http://localhost:4000/admin'
// const baseURL = process.env.REACT_APP_Admin_API_URL

// const defaultOptions = {
//   baseURL: baseURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

// // Create  user instance
// let adminInstance = axios.create(defaultOptions);

// // Set the AUTH token for any request
// adminInstance.interceptors.request.use(function (config) {
//   const Token = localStorage.getItem("adminToken");
//   config.headers.token = Token;
//   return config;
// });

// export default adminInstance;

import axios from 'axios'



const adminInstance = axios.create({
    baseURL: 'http://localhost:4000/admin'
})
const token = localStorage.getItem('adminToken')

adminInstance.defaults.headers.common['Authorization'] = token
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

export default adminInstance    