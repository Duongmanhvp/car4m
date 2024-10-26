import axios from "./api";

const fetchUserInfo = () => {
    return axios.get('/api/v1/users/me')
}

const fetchCCCD = () => {
    return axios.get('/api/v1')
}

const updateUserInfo = () => {}

export { fetchUserInfo }