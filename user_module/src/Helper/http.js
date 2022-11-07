import auth from "../services/auth";
//  var BaseURL = `http://localhost:3000`;
//  var BaseURL = `http://3.95.10.205`
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

const postData = async (url, body) => {
    // console.log(url, JSON.stringify(user.token), user.token)
    try {
        if (user.token) {
            console.log("-------====---------")
            const res = await axios.post(`${BaseURL}/api/${url}`, body, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${user.token}`,
                },
            })
            console.log(res)
            if (res.status === 200) {
                return res
            }
        } else {
            let obj = { status: 400, message: "Please login first" }
            return obj
        }
    } catch (e) {
        console.log(e)
        return []
    }
}
const getData = async (url) => {
    try {
        const response = await axios.get(`${BaseURL}/api/${url}`);
        if (response.status === 200) {
            return response.data
        } else {
            return [];
        }
    } catch (e) {
        console.log(e)
    }
}

const getList = async (url) => {
    try {
        const response = await axios.get(`${BaseURL}/api/${url}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
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

export default {
    BaseURL, Login_APi, postData, getList, getData
}