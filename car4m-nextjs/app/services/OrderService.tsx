import axios from "./api";

const getCarOrderTime = (id: number, start: Date, end: Date) => {
    return axios.get('/api/v1/cars/get-rental-between', {
        params: {
            id: id,
            receiveDate: start,
            returnDate: end
        }
    })
}

const createOrder = (id: number, start: Date, end: Date) => {
    console.log(id, start, end)
    return axios.post('/api/v1/cars/rent', {
        car_id: id,
        receive_date: start,
        return_date: end
    })
}

const getComingOrder = (id: number) => {
    return axios.get('/api/v1/cars/get-all-rental-coming', {
        params: {
            carId: id
        }
    })
}

const getFinishOrder = (id: number) => {
    return axios.get('/api/v1/cars/get-all-rental-finished', {
        params: {
            carId: id
        }
    })
}

const getProgressOrder = (id: number) => {
    return axios.get('/api/v1/cars/get-all-rental-progressing', {
        params: {
            carId: id
        }
    })
}

const getAllCarOrder = (id: number) => {
    return axios.get('/api/v1/cars/get-all-rental', {
        params: {
            carId: id
        }
    })
}

const postReview = (des: string, vote: number, id: number) => {
    return axios.post('/api/v1/reviews/', {
        rental_id: id,
        content: des,
        rating: vote
    })
}

const fetchCarReview = (id: number) => {
    return axios.get(`/api.v1/reviews/car/${id}`)
}


export { getCarOrderTime, createOrder, getComingOrder, getFinishOrder, getProgressOrder, getAllCarOrder, postReview, fetchCarReview }