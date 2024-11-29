'use client'

import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { format } from "date-fns"
import { useRouter } from 'next/navigation'
import Image from 'next/image'


import bg from "../assets/imgs/bg.png"
import iconLocation from "../assets/imgs/location.svg"
import tick from '../assets/imgs/tick.svg'
import close from '../assets/imgs/close.svg'

import { getAllCarOrder, getComingOrder, getFinishOrder, getProgressOrder } from '../services/OrderService'
import { acceptedCar, deleteCar, fetchCarAccept } from '../services/CarServices'
import { fetchOwner, fetchUserInfo } from '../services/UserServices'
import axios from '../services/api'

type OrderProps = {
    user_id: number,
    receive_date: Date
    return_date: Date
    total_fee: number
    rental_id: number
    username: string
}

type UserProps = {
    id: number
    username: string
    image: string
}

interface OrderId {
    carId: number
    setIsOrder: (order: number) => void
}

const HistoryAct: React.FC<OrderId> = ({ carId, setIsOrder }) => {
    const [coming, setComing] = useState<OrderProps[]>([])
    const [finish, setFinish] = useState<OrderProps[]>([])
    const [progress, setProgress] = useState<OrderProps[]>([])
    const [all, setAll] = useState<OrderProps[]>([])
    const [userInfo, setUserInfo] = useState<Record<number, UserProps>>({})
    const [filter, setFilter] = useState("4")

    const getComing = async () => {
        try {
            const response = await getComingOrder(carId)
            setComing(response.data)
        } catch (error) {
            console.log('Loi khi lay don thue sap toi', error)
        }
    }

    const getFinish = async () => {
        try {
            const response = await getFinishOrder(carId)
            setFinish(response.data)
        } catch (error) {
            console.log('Loi khi lay don thue da xong', error)
        }
    }

    const getProgress = async () => {
        try {
            const response = await getProgressOrder(carId)
            setProgress(response.data)
        } catch (error) {
            console.log('Loi khi lay don thue hien tai', error)
        }
    }

    const getAll = async () => {
        try {
            const response = await getAllCarOrder(carId)
            setAll(response.data)

            const res = await Promise.all(response.data.map((item: { user_id: number; rental_id: any }) => {
                const val = fetchOwner(item.user_id).then((user) => ({ rental_id: item.rental_id, user }))
                return val
            }))

            res.forEach(({ rental_id, user }) => userInfo[rental_id] = user)
        } catch (error) {
            console.log('Loi khi lay don thue hien tai', error)
        }
    }

    // Hàm fetch thông tin user
    const fetchOwner = async (id: number): Promise<UserProps> => {
        const { data } = await axios.get<UserProps>('/api/v1/users/detail-user', {
            params: {
                id: id
            }
        })
        return data
    }

    useEffect(() => {
        getAll()
        getComing()
        getFinish()
        getProgress()
    }, [])

    const router = useRouter()
    const handleInfoCar = (id: number) => {
        router.push(`/car?carID=${id}`)
    }

    const handleOwner = (id: number) => {
        router.push(`/owner?userId=${id}`)
    }

    return (
        <div className='bg-whitesmoke w-full flex flex-col font-baloo-2 px-2 gap-4'>
            <p onClick={() => setIsOrder(0)} className='cursor-pointer text-xl'> {"<"} Quay lai </p>
            <div className='text-xxl text-left flex flex-row items-center justify-between w-full'>
                <span className='flex flex-row gap-2'>
                    Lịch sử hoạt động
                </span>
                <div className="flex flex-row items-center justify-between gap-2 text-xl">
                    <span>Trạng thái:</span>
                    <div className='text-xl'>
                        <select className='p-1 border border-silver rounded font-medium bg-white'
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="4"> Chọn </option>
                            <option value="0"> Tất cả </option>
                            <option value="1"> Đơn sắp tới </option>
                            <option value="2"> Đơn hiện tại </option>
                            <option value="3"> Đơn đã xong </option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col items-center rounded-lg border border-line'>
                <div className='w-full flex flex-row items-center justify-between bg-primary rounded-t-lg'>
                    {/* <span className='w-full font- text-md text-white text-center py-2'> Mã </span> */}
                    <span className='w-full border-r text-md text-white text-center py-2'> Người thuê </span>
                    <span className='w-full border-r text-md text-white text-center py-2'> Ngày nhận </span>
                    <span className='w-full border-r text-md text-white text-center py-2'> Ngày trả </span>
                    <span className='w-full border-r text-md text-white text-center py-2'> Trạng thái </span>
                    <span className='w-full font- text-md text-white text-center py-2'> Giá </span>
                </div>

                {/* {(filter === '0') &&
                    (<>
                        {all.map((item) => {
                            return (<div className='w-full flex flex-row items-center justify-between border-t border-line text-xl'>
                                <span className='w-1/5 font- text-center p-2'> {userInfo[item.rental_id]?.username} </span>
                                <span className='w-1/5 font- text-center p-2'> {format(item.receive_date, "dd-MM-yyyy")} </span>
                                <span className='w-1/5 font- text-center p-2'> {format(item.return_date, "dd-MM-yyyy")} </span>
                                <span className='w-1/5 font- text-center p-2'> Đang tới </span>
                                <span className='w-1/5 font-medium text-center p-2'> {item.total_fee} VNĐ </span>

                            </div>)
                        }
                        )}
                    </>)
                } */}

                {(filter === '1' || filter === '0') &&
                    (<>
                        {coming.map((item) =>
                        (<div className='w-full flex flex-row items-center justify-between border-t border-line'>
                            <span onClick={() => handleOwner(item.user_id)} className='cursor-pointer hover:text-blue-500 hover:font-medium w-1/5 font- text-xl text-center p-2'>
                                {userInfo[item.rental_id]?.username}
                            </span>
                            <span className='w-1/5 font- text-xl text-center p-2'> {format(item.receive_date, "dd-MM-yyyy")} </span>
                            <span className='w-1/5 font- text-xl text-center p-2'> {format(item.return_date, "dd-MM-yyyy")} </span>
                            <span className='w-1/5 font- text-xl text-center p-2 text-blue-300'> Đang tới </span>
                            <span className='w-1/5 font-medium text-xl text-center p-2'> {item.total_fee} VNĐ </span>

                        </div>)
                        )}
                    </>)
                }

                {(filter === '2' || filter === '0') &&
                    (<>
                        {finish.map((item) => {
                            return (<div className='w-full flex flex-row items-center justify-between'>
                                <span onClick={() => handleOwner(item.user_id)} className='cursor-pointer hover:text-blue-500 hover:font-medium w-1/5 font- text-xl text-center p-2'>
                                    {userInfo[item.rental_id]?.username}
                                </span>
                                <span className='w-1/5 font- text-xl text-center p-2'> {format(item.receive_date, "dd-MM-yyyy")} </span>
                                <span className='w-1/5 font- text-xl text-center p-2'> {format(item.return_date, "dd-MM-yyyy")} </span>
                                <span className='w-1/5 font-medium text-xl text-center p-2 text-red'> Hoàn thành </span>
                                <span className='w-1/5 font- text-xl text-center p-2'> {item.total_fee} VNĐ </span>
                            </div>)
                        })}
                    </>)
                }

                {(filter === '3' || filter === '0') &&
                    (<>
                        {progress.map((item) =>
                        (<div className='w-full flex flex-row items-center justify-between'>
                            <span onClick={() => handleOwner(item.user_id)} className='cursor-pointer hover:text-blue-500 hover:font-medium w-1/5 font- text-xl text-center p-2'>
                                {userInfo[item.rental_id]?.username}
                            </span>
                            <span className='w-1/5 font- text-xl text-center p-2'> {format(item.receive_date, "dd-MM-yyyy")} </span>
                            <span className='w-1/5 font- text-xl text-center p-2'> {format(item.return_date, "dd-MM-yyyy")} </span>
                            <span className='w-1/5 font- text-xl text-center p-2 text-green'> Đang thuê </span>
                            <span className='w-1/5 font- text-xl text-center p-2'> {item.total_fee} VNĐ </span>

                        </div>)
                        )}
                    </>)
                }


            </div>
        </div>
    )
}

export default HistoryAct