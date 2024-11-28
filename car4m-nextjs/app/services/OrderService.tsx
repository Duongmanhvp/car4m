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

const getAllOrder = () => {
    
}

export { getCarOrderTime, createOrder }