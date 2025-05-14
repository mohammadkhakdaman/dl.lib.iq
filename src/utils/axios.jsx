import Axios from 'axios'

const token = '19|5GvSnUVSQ8haBAZIpMJnXACr84F1QsBrfYeGSelddec006f7';
// const token = '19|5GvSnUVSQ8haBAZIpMJnXACr84F1QsBrfYeGSelddec006f7';

const config = {
    headers: {Authorization: `Bearer ${token}` }
};

const bodyParameters = {
   key: "value"
};

const axios = Axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    // bodyParameters,
    config,
    // headers: {
    //     // 'X-Requested-With': 'XMLHttpRequest',
    //     // 'Access-Control-Allow-Origin' : '*',
    //     // 'Access-Control-Allow-Methods': '*',
    //     // 'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    //     // 'Access-Control-Allow-Credentials' : true,
        
    //     // 'accept': 'application/json',
    // },
    // withCredentials: true,
    // withXSRFToken: true
})

export default axios
