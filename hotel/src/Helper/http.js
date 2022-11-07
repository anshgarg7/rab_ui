 import auth from "../services/auth";
//  var BaseURL = `http://localhost:3000`;
//  var BaseURL = `http://44.202.241.193`
var BaseURL = `https://admin.tripperpedia.in`;
 const axios = require("axios");
 let user = auth.getUser()


const Login_APi = async (url, body, type) => {
    
    try {
        const res = await axios.post(`${BaseURL}/api/${url}`, body);
        
        if (res.status === 200) {
            return res
        }
    } catch (e) {
        return [];
    }
}

 const postData = async (url,  body) => {
    try {
        const res = await axios.post(`${BaseURL}/api/${url}`, body, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
        if (res.status === 200) {
            return res
        }
    } catch (e) {
        return []
    }
}

const getList = async (url) => {
    // console.log(url)
    try {
        const response = await axios.get(`${BaseURL}/api/${url}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        // console.log(response)
        if (response.status === 200) {
            return response.data
        } else {
            return [];
        }
    } catch (e) {
       console.log(e)
    }
}

// const getData = async (url, token, id) => {
//     try {
//         const response = await axios.get(`${BaseURL}/api/${url}/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         if (response?.status === 200) {
//             return response.data;
//         } else {
//             return [];
//         }
//     } catch (e) {
//         return []
//     }
// }

export default{
    BaseURL,Login_APi,postData,getList
}