'use client'
import type { NextPage } from 'next'
import Image from "next/image"
import Header from '../home/header'
import { useEffect, useState } from 'react'
import { fetchCarInfo, likeCar } from '../services/CarServices'
import { useSearchParams } from 'next/navigation'
import DatePickerFrame from './datepicker'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import trans from "../assets/imgs/truyendong.svg"
import seat from "../assets/imgs/seat.svg"
import fuels from "../assets/imgs/fuels.svg"
import consume from "../assets/imgs/consume.svg"
import heart from "../assets/imgs/heart.svg"
import redheart from "../assets/imgs/redheart.svg"
import post from "../assets/imgs/location.svg"
import iconU from '../assets/imgs/user-icon.svg'
import iconLocation from '../assets/imgs/location.svg'
import avatar from '../assets/imgs/avatar.png'

import FrameFeature from './feature';
import { format, set } from "date-fns";
import { createOrder, fetchCarReview, getCarOrderTime } from '../services/OrderService';
import { create } from 'domain';
import { icon } from 'leaflet'
import Footer from '../home/footer'
import { fetchOwner } from '../services/UserServices'

type Time = {
    receive: Date,
    return: Date
}

type UserReview = {
    name: string
    id: number
    image: string
}

type Rewiew = {
    description: string
    vote: number
    user_id: number
    username: number
    avatar: string
}

const OPEN_CAGE_API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY
const linkImg = process.env.NEXT_PUBLIC_LINK


const Car: NextPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const carId = Number(searchParams.get('carID'))
    const [review, setReview] = useState<Rewiew[]>([])
    const [list, setList] = useState<Time[]>([])
    const [liked, setLiked] = useState(false)
    const [data, setData] = useState({
        type: '',
        name: '',
        rental_fee: 0,
        latitude: 0,
        longitude: 0,
        comforts: [] as string[],
        description: '',
        fuel: '',
        fuel_consumption: '',
        image: '',
        seats: null,
        transmission: '',
        location: '',
        id: null,
        user_id: null
    })
    const [owner, setOwner] = useState({
        username: '',
        image: '',
        email: '',
        phone: '',
        id: null
    })
    const [confirm, setConfirm] = useState(false)
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState<any>()
    const [dates, setDates] = useState<{
        pickUp: Date | null;
        dropOff: Date | null;
    }>({
        pickUp: null,
        dropOff: null,
    })
    const accesstoken = localStorage.getItem('access_token')

    const toggleConfirm = () => setConfirm(!confirm)

    const updateData = (key: keyof typeof data, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }))
    }
    const handleDateChange = (newDates: { pickUp: Date | null; dropOff: Date | null }) => {
        setDates(newDates);
        //console.log("Updated dates:", newDates);
    }
    const isOpenDatePicker = () => {
        setOpen(!open)
    }
    const calculateHours = () => {
        if (!dates.pickUp || !dates.dropOff) return 0;
        const pickUpDate = dates.pickUp.getTime();
        const dropOffDate = dates.dropOff.getTime();
        const diffTime = dropOffDate - pickUpDate;
        return Math.ceil(diffTime / (1000 * 3600));
    }
    const calculateDays = () => {
        if (!dates.pickUp || !dates.dropOff) return 0;
        const pickUpDate = dates.pickUp.getTime();
        const dropOffDate = dates.dropOff.getTime();
        const diffTime = dropOffDate - pickUpDate;
        return Math.ceil(diffTime / (1000 * 3600 * 24));
    }
    const getLocation = async (latitude: number, longitude: number) => {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: `${latitude},${longitude}`,
                    key: OPEN_CAGE_API_KEY,
                    language: 'vi',
                    countrycode: 'VN',
                },
            })
            updateData('location', response.data.results[0].formatted)
        } catch (error) {
            console.error("Lỗi khi lấy địa chỉ từ tọa độ:", error);
        }
    }
    const getCar = async (id: number) => {
        try {
            const response = await fetchCarInfo(id)
            updateData('id', response.data.id)
            updateData('type', response.data.type)
            updateData('name', response.data.name)
            updateData('rental_fee', response.data.rental_fee)
            updateData('comforts', response.data.car_detail.comforts)
            updateData('description', response.data.car_detail.description)
            updateData('fuel', response.data.car_detail.fuel)
            updateData('fuel_consumption', response.data.car_detail.fuel_consumption)
            updateData('image', response.data.car_detail.image)
            updateData('seats', response.data.car_detail.seats)
            updateData('transmission', response.data.car_detail.transmission)
            updateData('latitude', response.data.location.latitude)
            updateData('longitude', response.data.location.longitude)
            updateData('user_id', response.data.user_id)
        } catch (error) {

        }
    }

    const likedCar = async () => {
        try {
            const response = await likeCar(carId)
            if (response) {
                setLiked(!liked)
            }
        } catch (error) {
            console.log('Loi khi like car', error)
            setLiked(!liked)
        }
    }

    const handleRent = () => {
        if (data.id && dates.pickUp && dates.dropOff)
            createOrder(data.id, dates.pickUp, dates.dropOff)
        //console.log(data.id, dates.pickUp, dates.dropOff)
        //router.push('/home')
    }

    const getReview = async () => {
        try {
            const respone = await fetchCarReview(Number(searchParams.get('carID')))
            setReview(respone.data)
        } catch (error) {
            console.log('Loi khi lay du lieu review', error)
        }
    }

    const getOwner = async (id: number) => {
        try {
            const response = await fetchOwner(id)
            setOwner(response.data)
        } catch (error) {
            console.log('Loi khi lay du lieu chu xe', error)
        }
    }

    const calculateAverage = (list: Rewiew[]) => {
        let total = 0
        list.map((item) => total = total + Number(item.vote))
        return total / list.length
    }

    const handleUser = (id: number) => {
        router.push(`/owner?userId=${id}`);
    }

    useEffect(() => {
        getCar(Number(searchParams.get('carID')))
        getReview()
        //getListTime()
    }, [])

    useEffect(() => {
        getOwner(Number(data.user_id))
    }, [data.user_id])

    useEffect(() => {
        if (data.latitude && data.longitude)
            getLocation(data.latitude, data.longitude)
    }, [data.latitude, data.longitude])

    //console.log(data)

    return (
        <section className="main flex flex-col justify-center items-center font-baloo-2">
            <Header />

            <div className='w-full flex items-center justify-center border-b border-line pb-[10px]'>
                <div className="w-[1120px] relative flex flex-col items-center justify-center bg-white">
                    <div className='w-full h-[500px]'>

                    </div>

                    <div className="w-full relative flex flex-row justify-between gap-4">
                        <div className="w-full flex flex-col items-center justify-center gap-4 relative text-left text-xl text-black pr-2">
                            <div className="relative w-full border-line border-b-[1px] border-solid box-border flex flex-col items-start justify-start py-4 text-[30px]">
                                <div className="w-full flex flex-row items-center justify-start">
                                    <div className="w-full flex flex-col items-start justify-start gap-2">

                                        <div className="flex flex-row w-full justify-between relative leading-[17px]">
                                            <b className="relative leading-[18px] flex items-center shrink-0 py-1 text-xxl">
                                                {String(data.type).toUpperCase()} {String(data.name).toUpperCase()}
                                                {/* {String("Mazda CX-5 2024").toUpperCase()} */}
                                            </b>
                                            <div onClick={likedCar} className='rounded-full cursor-pointer h-full'>
                                                <Image alt='' src={liked ? redheart : heart}></Image>
                                            </div>
                                        </div>
                                        <div className="w-1/2 flex flex-row items-center justify-start gap-[9px] text-sm text-oil-11">
                                            <Image className="w-4 relative rounded-[0.5px] h-4" width={16} height={16} alt="" src={post} />
                                            <div className="truncate"> {data.location} </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-between gap-2">
                                            <span className="text-sm bg-blue-100 px-2 rounded-[100px]">{data.transmission == "MT" ? "Số sàn" : "Số tự động"}</span>
                                            <span className="text-sm bg-green-100 px-2 rounded-[100px]">Thuê giờ</span>
                                            <span className="text-sm bg-whiteblue px-2 rounded-[100px]">Miễn thế chấp</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative w-full flex flex-col items-start justify-start py-2 border-line border-b text-oil-11">
                                <div className="self-stretch flex flex-col items-start justify-center gap-2">
                                    <b className="relative inline-block text-xx font-medium">Đặc điểm</b>
                                    <div className="self-stretch overflow-x-auto shrink-0 flex flex-row items-center justify-between gap-6">
                                        <div className="relative shrink-0 ">
                                            <div className="relative  flex flex-row items-center justify-center gap-3">
                                                <Image className="w-8 relative h-8" alt="" src={trans} />
                                                <div className='flex flex-col'>
                                                    <p className="text-xl text-iconcolor">Truyền động</p>
                                                    <b className="m-0 font-medium text-md">{data.transmission == "AT" ? "Số tự động" : "Số sàn"}</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative shrink-0">
                                            <div className="relative  flex flex-row items-center justify-center gap-3">
                                                <Image className="w-8 relative h-8" alt="" src={seat} />
                                                <div className='flex flex-col'>
                                                    <p className="text-iconcolor">Số ghế</p>
                                                    <b className="m-0 font-medium text-md">{data.seats} chỗ</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative shrink-0 ">
                                            <div className="relative  flex flex-row items-center justify-center gap-4">
                                                <Image className="w-7 relative h-7" alt="" src={fuels} />
                                                <div className='flex flex-col'>
                                                    <p className="text-iconcolor">Nhiên liệu</p>
                                                    <b className="m-0 font-medium text-md">{(data.fuel == "GASOLINE") ? "Xăng" : "Điện"}</b>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative shrink-0 ">
                                            <div className="relative  flex flex-row items-center justify-center gap-3">
                                                <Image className="w-8 relative h-8" alt="" src={consume} />
                                                <div className='flex flex-col'>
                                                    <p className="text-iconcolor">Tiêu hao</p>
                                                    <b className="m-0 font-medium text-md"> {data.fuel_consumption}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full relative border-b-[1px] border-line box-border flex flex-col items-start justify-center py-2 gap-[15px]">
                                <div className="flex flex-row items-start justify-start">
                                    <b className="relative inline-block text-xx font-medium"> Mô tả </b>
                                </div>
                                <div className="w-full relative leading-[15px] text-iconcolor flex items-center shrink-0 py-2 text-base">
                                    <span className="w-full">
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">{data.type} {data.name} </p>
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">{data.description}</p>
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">Xe rộng rãi, an toàn, tiện nghi</p>
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">Xe trang bị hệ thống {data.comforts?.[0]}, {data.comforts?.[1]}, {data.comforts?.[2]} cùng nhiều tiện nghi khác…</p>
                                        <p className="m-0">Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !</p>
                                    </span>
                                </div>
                            </div>

                            <div className="w-full relative border-b-[1px] border-line box-border flex flex-col items-start justify-center py-2 pb-2 gap-[15px]">
                                <div className="flex flex-row items-start justify-start">
                                    <b className="relative inline-block text-xx font-medium"> Các tiện nghi khác </b>
                                </div>
                                <FrameFeature features={["Bản đồ",
                                    "Bluetooth",
                                    "Camera hành trình",
                                    "Camera lùi",
                                    "Cảm biến lốp",
                                    "Cảm biến va chạm",
                                    "Định vị GPS",
                                    "ETC",]} />
                            </div>

                            <div className="relative border-line border-b-[1px] border-solid box-border flex flex-col items-start justify-center py-2 gap-[15px]">
                                <div className="flex flex-row items-start justify-start">
                                    <b className="relative inline-block text-xx font-medium">Điều khoản</b>
                                </div>
                                <div className="w-full relative leading-[15px] text-iconcolor flex items-center shrink-0 py-2 text-base">
                                    <span className="w-full">
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">Quy định khác:</p>
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Sử dụng xe đúng mục đích.</p>
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.</p>
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Không sử dụng xe thuê để cầm cố, thế chấp.</p>
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</p>
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Không chở hàng quốc cấm dễ cháy nổ.</p>
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Không chở hoa quả, thực phẩm nặng mùi trong xe.</p>
                                        <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ thu phí vệ sinh xe.</p>
                                        <p className="m-0">Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !</p>
                                    </span>
                                </div>
                            </div>

                            <div className="relative w-full border-line border-b-[1px] border-solid box-border flex flex-col items-start justify-start py-2">
                                <div className="self-stretch h-[69px] flex flex-row items-center justify-start">
                                    <div className="w-[676px] flex flex-col items-start justify-start gap-1">
                                        <b className="relative inline-block text-xx font-medium">Vị trí xe</b>
                                        <div className="self-stretch h-[17px] flex flex-row items-center justify-start text-oil-11 py-4 gap-2">
                                            <Image src={iconLocation} alt={''} className='w-6 h-6 relative'></Image>
                                            <div className="w-[676px] relative inline-block shrink-0"> {data.location} </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-full flex flex-col items-start justify-start py-2">
                                <div className="self-stretch flex flex-row items-center justify-start">
                                    <div className="w-full flex flex-col items-start justify-start gap-2">
                                        <b className="relative inline-block text-xx font-medium">Chủ xe </b>
                                        <div className="w-full flex flex-row items-start justify-between p-2">
                                            <div onClick={() => handleUser(Number(owner.id))} className='cursor-pointer flex flex-row items-center gap-4'>
                                                <Image src={owner.image ? (linkImg + owner.image) : iconU} alt={''} className='rounded-full w-[70px] h-[70px]' />
                                                <p className='font-medium text-xx'> {owner.username} </p>
                                            </div>

                                            <div className='flex flex-row items-center justify-between gap-4'>
                                                <div className='flex flex-col items-center justify-center gap-2'>
                                                    <p className='text-silver text-xl'> Tỉ lệ phản hồi </p>
                                                    <p className='font-medium text-xl'> 100% </p>
                                                </div>
                                                <div className='flex flex-col items-center justify-center gap-2'>
                                                    <p className='text-silver text-xl'> Thời gian phản hồi </p>
                                                    <p className='font-medium text-xl'> 20 phút </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-full flex flex-col items-start justify-start py-2 gap-4">
                                <div className='flex flex-row items-center justify-start gap-1'>
                                    {/* <Image src={star} alt={''} className='w-4 h-4 relative'></Image> */}
                                    <span>⭐</span>
                                    <p className='font-medium text-md'> {calculateAverage(review).toFixed(1)} - </p>
                                    <p className='text-md'> {review.length} Đánh giá </p>
                                </div>

                                <div className='w-full relative flex flex-col items-center justify-between gap-2'>
                                    {review.map((item) =>
                                    (<div className="w-full flex flex-row items-center justify-center gap-4 border border-smoke rounded-lg p-4">
                                        <Image onClick={() => handleUser(item.user_id)} className="rounded-full w-[70px] h-[70px] object-cover cursor-pointer" alt="" src={item.avatar ? (linkImg + item.avatar) : avatar} />
                                        <div className='w-full flex flex-col gap-1'>
                                            <div onClick={() => handleUser(item.user_id)} className="flex flex-row items-center gap-3 cursor-pointer">
                                                <b className="relative font-medium items-center"> {item.username}</b>
                                                <div className="overflow-hidden flex flex-row items-center justify-start gap-0.5">
                                                    {Array.from({ length: Math.round(item.vote) }, (_, index) => (
                                                        <span key={index}>⭐</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className='text-base text-dimgray'> {item.description} </span>
                                            {/* <div className="relative tracking-[-0.02em] leading-[150%] font-medium flex flex-row items-center justify-end shrink-0">22 July 2022</div> */}
                                        </div>
                                    </div>)
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="relative flex flex-col pt-4">
                            <div className="w-[370px] bg-semiblue border border-smoke rounded-lg p-5">
                                {/* Giá thuê */}
                                <div className="flex items-center justify-start mb-4">
                                    <div className="text-3xl font-bold text-blue-500">856K</div>
                                    <span className="text-sm text-gray-500">/ngày</span>
                                </div>

                                {/* Thời gian */}
                                <div onClick={isOpenDatePicker} className="cursor-pointer grid grid-cols-2 mb-4 border border-line rounded-lg bg-white ">
                                    <div className='flex flex-col gap-1 p-3 border-r border-line'>
                                        <p className="text-base text-left">Nhận xe</p>
                                        <div className="flex flex-row items-center justify-between gap-2 text-center">
                                            <span className="font-medium text-xl">{dates.pickUp ? format(dates.pickUp, "dd/MM/yyyy") : "30/11/2024"}</span>
                                            <span className="text-xl font-medium">{dates.pickUp ? format(dates.pickUp, "HH:mm") : "23:00"}</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1 p-3'>
                                        <p className="text-base text-left">Trả xe</p>
                                        <div className="flex flex-row items-center justify-between gap-2 text-center">
                                            <span className="font-medium text-xl">{dates.dropOff ? format(dates.dropOff, "dd/MM/yyyy") : "01/12/2024"}</span>
                                            <span className="text-xl font-medium">{dates.dropOff ? format(dates.dropOff, "HH:mm") : "20:00"}</span>
                                        </div>
                                    </div>
                                </div>
                                {open && (
                                    <DatePickerFrame
                                        carId={Number(data.id)}
                                        pickUp={dates.pickUp}
                                        dropOff={dates.dropOff}
                                        onDateChange={handleDateChange}
                                        isOpenDatePicker={isOpenDatePicker}
                                    />
                                )}
                                {/* Địa điểm giao xe */}


                                {/* Bảng giá */}
                                <div className="mb-4 text-base">

                                    <div className='flex flex-col border-t border-b border-line py-2 gap-2'>
                                        <div className="flex justify-between">
                                            <span>Đơn giá thuê</span>
                                            <span>{Number(data.rental_fee).toLocaleString("vi-VN")} đ/ giờ</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Bảo hiểm thuê xe</span>
                                            <span>50.000 đ/ ngày</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between py-2">
                                        <span>Tổng</span>
                                        <span>{Number(data.rental_fee).toLocaleString("vi-VN")} x {calculateHours()} giờ + 50.000 x {calculateDays()} ngày</span>
                                    </div>
                                </div>

                                {/* Giảm giá */}
                                <div className="mb-4 text-sm">
                                    <div className="flex justify-between mb-2">
                                        <span className="flex items-center">
                                            <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded-full text-xs font-semibold mr-2">
                                                Chương trình giảm giá
                                            </span>

                                        </span>
                                        <span>-0đ</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="flex items-center">
                                            <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-xs font-semibold mr-2">
                                                Mã khuyến mãi
                                            </span>
                                        </span>
                                        <span>0đ</span>
                                    </div>
                                </div>

                                {/* Tổng thành tiền */}
                                <div className="flex justify-between items-center font-bold text-xl py-2 border-t border-line">
                                    <span>Thành tiền</span>
                                    <span className="text-blue-500">{Number(data.rental_fee * calculateHours() + 50000 * calculateDays()).toLocaleString("vi-VN")} đ</span>
                                </div>

                                {/* Nút chọn thuê */}
                                <button onClick={toggleConfirm} className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                                    CHỌN THUÊ
                                </button>
                                {confirm && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10" >
                                        <div className="bg-white rounded-lg p-6 w-[300px] shadow-lg relative z-20">
                                            <h2 className="text-xx font-medium text-center mb-4">Xác nhận thuê xe</h2>
                                            <div className='flex flex-row items-center justify-between gap-2'>
                                                <button className="mt-4 w-full px-4 py-2 bg-smoke text-silver rounded-lg" onClick={toggleConfirm}>
                                                    Hủy
                                                </button>
                                                <button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg" onClick={() => handleRent()}>
                                                    Xác nhận
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </section>
    )
};

export default Car;
