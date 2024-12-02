import axios from "./api";

const fetchUserInfo = () => {
    return axios.get('/api/v1/users/me')
}

const fetchCCCD = () => {
    return axios.get('/api/v1')
}

const fetchOwner = (id: number) => {
    return axios.get('/api/v1/users/detail-user', {
        params: {
            id: id
        }
    })
}

const fetchReviewUser = (id: number) => {
    return axios.get('/api/v1/users/review', {
        params: {
            id: id
        }
    })
}

const fetchAllUser = () => {
    return axios.get('/api/v1/users/get-all-user', {
        params: {
            pageNo: 0,
            pageSize: 8
        }
    })
}

export { fetchUserInfo, fetchOwner, fetchReviewUser, fetchAllUser}