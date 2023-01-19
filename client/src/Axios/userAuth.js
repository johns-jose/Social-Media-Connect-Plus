import axios from 'axios'



const userInstance = axios.create({
    baseURL: 'http://localhost:4000'
})


userInstance.defaults.headers.common['Authorization'] = localStorage.getItem('userToken')


export default userInstance 