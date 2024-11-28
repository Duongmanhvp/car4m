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

const addCar = (name: string, rentalFee: number, type: string, location: string, transmission: string, fuel: string, seats: number, fuelConsumption: number, description: string, comfortIds: number[], images: string[]) => {
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

const fetchMyCar = () => {
    return axios.get('/api/v1/cars/get-my-cars', {
        params: {
            pageNo: 0,
            pageSize: 6
        }
    })
}

const fetchCarUser = (id: number) => {
    return axios.get('/api/v1/cars/get-car-user', {
        params: {
            pageNo: 0,
            pageSize: 6,
            id: id
        }
    })
}

const fetchDate = (id: number, pickup: Date, dropoff: Date) => {
    return axios.post('/api/v1/cars/get-rental-between', {
        params: {
            car_id: id,
            receive_date: pickup,
            return_date: dropoff
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
    return axios.post('/api/v1/cars/delete', {
        params: {
            car_id: id
        }
    })
}

const likeCar = (id: number) => {
    return axios.post('/api/v1/cars/like', {
        params: {
            car_id: id
        }
    })
}

const fetchCarAccept = () => {
    return axios.get('/api/v1/cars/get-all-not-accepted', {
        params: {
            pageNo: 0,
            pageSize: 3
        }
    })
}

const acceptedCar = (id: number) => {
    return axios.post('/api/v1/cars/accept', {
        params: {
            car_id: id
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
         fetchCarUser }