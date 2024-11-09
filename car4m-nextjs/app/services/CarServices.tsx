import axios from "./api"

const fetchCarByLocation = (location: string, radius: number) => {
    return axios.get('/api/v1/cars/get-by-location', {
        params: {
            pageNo: 0,
            pageSize: 16,
            radius: radius,
            location: location
        }
    })
}

const fetchCarByFilter = (type: string, fuel: string, minPrice: string, maxPrice: string, seats: string, transmission: string, radius: string) => {
    console.log(type, fuel, minPrice, maxPrice, seats, transmission, radius)

    return axios.get('/api/v1/cars/search', {
        data: {
            type: type,
            fuel: fuel,
            minPrice: minPrice,
            maxPrice: maxPrice,
            seats: seats,
            transmission: transmission,
            radius: radius
        },
        params: {
            pageNo: 0,
            pageSize: 16,
        }
    })
}

const fetchCarInfo = (id: number) => {
    return axios.get('/api/v1/cars/info', {
        params: {
            ID: id
        }
    }) 
}

export { fetchCarByLocation, fetchCarByFilter, fetchCarInfo }