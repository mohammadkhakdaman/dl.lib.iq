import axios from "axios";
import appConfig from "@/config/appConfig";


const BaseService = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiBaseUrl,
})

//defining interceptors for request and response if necessery
BaseService.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

BaseService.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { response } = error

        return Promise.reject(error)
    }
)


const ApiService = {
    fetch(param) {
        return new Promise((resolve, reject) => {
            BaseService(param).then(response => {
                resolve(response.data)
            }).catch(errors => {
                //reject(errors)
                console.log(errors);
                resolve({success: false, message: "بروز خطا در اجرای درخواست", data: null})
            })
        })
    },

    /**
     * @typedef {Object} GetConfig
     * @property {string} url - The endpoint URL
     * @property {string} baseURL - The base URL for requests
     * @property {Object} params - Request parameters
     * @property {Object} headers - HTTP headers
     */

    /** @param {GetConfig} config */
    get(config) {
        return this.fetch({
            method: 'get',
            ...config
        })
    },

    /**
     * @typedef {Object} PostConfig
     * @property {string} url - The endpoint URL
     * @property {string} baseURL - The base URL for requests
     * @property {Object} params - Request parameters
     * @property {Object} headers - HTTP headers
     * @property {any} data - Request payload
     */

    /** @param {PostConfig} config */
    post(config) {
        return this.fetch({
            method: 'post',
            ...config
        })
    }
}

export default ApiService