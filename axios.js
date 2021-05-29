import axios from "axios"

export const fetchCalls = {
       get: (url) => {
           return axios.get(url)
       } ,
       post: (url,data)=> {
           return axios.post(url , data)
       } ,
       patch: (url , data) => {
           return axios.patch(url , data)
       } ,
       delete: (url) =>{
           return axios.delete(url)
       } ,
       put: (url, data)=>{
           return axios.put(url, data)
       }
}