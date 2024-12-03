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

const fetchAllUser = (no: number) => {
    return axios.get('/api/v1/users/get-all-user', {
        params: {
            pageNo: no,
            pageSize: 5
        }
    })
}

const fetchCountUser = () => {
    return axios.get('/api/v1/users/get-all-user', {
        params: {
            pageNo: 0,
            pageSize: 5
        }
    })
}

export { fetchUserInfo, fetchOwner, fetchReviewUser, fetchAllUser, fetchCountUser}