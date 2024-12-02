import { loadBindings } from "next/dist/build/swc"
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

const fetchCarByFilter = (type: string, fuel: string, minPrice: string, maxPrice: string, seats: string, transmission: string, location: string, radius: string) => {
    return axios.get('/api/v1/cars/search', {
        params: {
            pageNo: 0,
            pageSize: 16,
            type: type,
            fuel: fuel,
            minPrice: minPrice,
            maxPrice: maxPrice,
            seats: seats,
            transmission: transmission,
            location: location,
            radius: radius
        }
    })
}

const fetchCarInfo = (id: number) => {
    return axios.get('/api/v1/cars/get', {
        params: {
            id: id
        }
    }) 
}

const addCar = (name: string, rentalFee: number, type: string, location: string, transmission: string, fuel: string, seats: number, fuelConsumption: string, description: string, comfortIds: number[], images: string[]) => {
    return axios.post('/api/v1/cars/', {
        name: name,
        rental_fee: rentalFee,
        type: type,
        location: location,
        transmission: transmission,
        fuel: fuel,
        seats: seats,
        fuel_consumption: fuelConsumption,
        description: description,
        comfort_ids: comfortIds,
        images: images
    })
}

const fetchAllCar = () => {
    return axios.get('/api/v1/cars/get-all', {
        params: {
            pageNo: 0,
            pageSize: 8
        }
    })
}

const fetchAllCarAcp = (no: number) => {
    return axios.get('/api/v1/cars/get-all', {
        params: {
            pageNo: no,
            pageSize: 5
        }
    })
}

const fetchMyCar = () => {
    return axios.get('/api/v1/cars/get-my-cars', {
        params: {
            pageNo: 0,
            pageSize: 6
        }
    })
}

const fetchCarUser = (id: number) => {
    return axios.get('/api/v1/cars/get-by-user', {
        params: {
            pageNo: 0,
            pageSize: 4,
            userId: id
        }
    })
}

const fetchMyLike = () => {
    return axios.get('/api/v1/cars/get-my-liked', {
        params: {
            pageNo: 0,
            pageSize: 8
        }
    })
}

const deleteCar = (id: number) => {
    return axios.post(`/api/v1/cars/delete?carId=${id}`)
}

const likeCar = (id: number) => {
    return axios.post(`/api/v1/cars/like`, id)
}

const fetchCarAccept = (no: number) => {
    return axios.get('/api/v1/cars/get-all-not-accepted', {
        params: {
            pageNo: no,
            pageSize: 5
        }
    })
}

const rejectedCar = (id: number) => {
    return axios.post('/api/v1/cars/reject',id)
}


const acceptedCar = (id: number) => {
    return axios.post('/api/v1/cars/accept',{
        carId: id
    })
}

const fetchReviewCar = (id: number) => {
    return axios.get(`/api.v1/reviews/car/${id}`)
}

const fetchCarOrder = () => {
    return axios.get('/api/v1/cars/get-my-trip', {
        params: {
            pageNo: 0,
            pageSize: 6
        }
    })
}

const fetchCarByType = (type: string) => {
    return axios.get('/api/v1/cars/get-by-type', {
        params: {
            pageNo: 0,
            pageSize: 8,
            type: type
        }
    })
}

const fetchCarByFuel = (type: string) => {
    return axios.get('/api/v1/cars/get-by-fuel', {
        params: {
            pageNo: 0,
            pageSize: 8,
            fuel: type
        }
    })
}

const fetchCarBySeats = (type: number) => {
    return axios.get('/api/v1/cars/get-by-seats', {
        params: {
            pageNo: 0,
            pageSize: 8,
            seats: type
        }
    })
}

const fetchCarByTransmission = (type: string) => {
    return axios.get('/api/v1/cars/get-by-transmission', {
        params: {
            pageNo: 0,
            pageSize: 8,
            transmission: type
        }
    })
}

const fetchCarByPrice = (min: number, max: number) => {
    return axios.get('/api/v1/cars/get-by-price', {
        params: {
            pageNo: 0,
            pageSize: 8,
            minPrice: min,
            maxPrice: max
        }
    })
}

export { fetchCarByLocation, 
         fetchCarByFilter, 
         fetchCarInfo, 
         addCar, 
         fetchAllCar, 
         fetchMyCar, 
         deleteCar, 
         likeCar, 
         fetchCarAccept, 
         acceptedCar, 
         fetchMyLike,
         fetchCarUser,
         fetchReviewCar,
         fetchCarOrder,
         fetchCarByFuel,
         fetchCarByPrice,
         fetchCarBySeats,
         fetchCarByTransmission,
         fetchCarByType, 
         fetchAllCarAcp,
         rejectedCar, }