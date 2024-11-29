'use client'

import type { NextPage } from 'next'
import Image from "next/image"
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import Header from '../home/header'
import Footer from '../home/footer'

import { fetchOwner, fetchReviewUser } from '../services/UserServices'
import { fetchAllCar, fetchCarUser } from '../services/CarServices'

import icon from '../assets/imgs/user-icon.svg'
import bg from '../assets/imgs/bg.jpeg'
import iconLocation from '../assets/imgs/location.svg'
import star from '../assets/imgs/star.svg'

type UserReview = {
    name: string
    id: number
    image: string
}

type Rewiew = {
    descripsion: string
    vote: number
    user: UserReview
}

const Owner: NextPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [items, setItems] = useState<any[]>([])
    const [review, setReview] = useState<Rewiew[]>([])
    const [owner, setOwner] = useState({
        username: '',
        image: '',
        email: '',
        phone: '',
        id: null
    })

    const srtingToLink = (images: string) => {
        let image: string[] = images.split(',')
        return image[0]
    }

    const calculateAverage = (list: any[]): number => {
        const validScores = list.filter(
            (item) => typeof item.vote === "number"
        )
        if (validScores.length === 0) return 0

        const totalScore = validScores.reduce((sum, item) => sum + item.vote, 0)
        return totalScore / validScores.length
    }

    const getOwner = async (id: number) => {
        try {
            const response = await fetchOwner(id)
            setOwner(response.data)
            console.log(response.data)
        } catch (error) {
            console.log('Loi khi lay du lieu chu xe', error)
        }
    }

    const getCar = async () => {
        try {
            const response = await fetchCarUser(Number(searchParams.get('userId')))
            setItems(response.data.content)
        } catch (error) {
            console.log('Loi khi lay du lieu xe', error)
        }
    }

    const getReview = async () => {
        try {
            const respone = await fetchReviewUser(Number(searchParams.get('userId')))
            setReview(respone.data.content)
        } catch (error) {
            console.log('Loi khi lay du lieu review', error)
        }
    }

    const handleInfoCar = (id: number) => {
        router.push(`/car?carID=${id}`);
    }

    const handleUser = (id: number) => {
        router.push(`/owner?userId=${id}`);
    }

    useEffect(() => {
        getOwner(Number(searchParams.get('userId')))
        getCar()
        getReview
    }, [])

    return (
        <section className="main flex flex-col justify-center items-center font-baloo-2">
            <Header />
            <div className='w-full bg-whitesmoke flex items-center justify-center py-[80px]'>
                <div className='w-[1120px] flex flex-col items-center justify-center gap-4'>
                    <div className='w-[850px] flex flex-col bg-white rounded-xl p-[32px] gap-4'>
                        <div className='flex flex-row items-center justify-between'>
                            <p className='font-medium text-xx'> Thông tin tài khoản </p>
                        </div>

                        <div className='flex flex-row items-center gap-8'>
                            <div className='w-1/3 flex flex-col items-center justify-center gap-2'>
                                <Image src={icon} alt={''} className='w-[150px] h-[150px] relative rounded-full' />
                                <p className='text-md'> {owner.username} </p>
                            </div>

                            <div className='w-2/3 flex flex-col items-start justify-between rounded-lg bg-blue-100 gap-2 p-4'>
                                <div className='w-full flex flex-row items-start justify-between'>
                                    <p className='text-base'>Email</p>
                                    <p className='font-medium text-xl'> {owner.email} </p>
                                </div>
                                <div className='w-full flex flex-row justify-between'>
                                    <p className='text-base'>Số điện thoại</p>
                                    <p className='font-medium text-xl'> {owner.phone} </p>
                                </div>
                                <div className='w-full flex flex-row justify-between'>
                                    <p className='text-base'>Tỉ lệ phản hồi</p>
                                    <p className='font-medium text-xl'> 100% </p>
                                </div>
                                <div className='w-full flex flex-row justify-between'>
                                    <p className='text-base'>Thời gian phản hồi</p>
                                    <p className='font-medium text-xl'> 30 phút </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-[850px] flex flex-col bg-white rounded-xl p-[32px] gap-4'>
                        <div className='flex flex-row items-center justify-between'>
                            <p className='font-medium text-xx'> Danh sách xe </p>
                        </div>

                        <div className="relative flex items-center justify-center w-full grid gap-6 grid-cols-1 sm:grid-cols-2">
                            {items.map((item) =>
                            (<div onClick={() => handleInfoCar(item.id)} className='cursor-pointer min-w-[255px] max-w-[500px] rounded-xl border border-line    '>
                                <div className="rounded-xl bg-white p-2 flex flex-col items-start justify-start text-left text-base text-gray">
                                    <div className="w-full aspect-video p-2 relative rounded-xl bg-smoke">
                                        <Image src={srtingToLink(item.car_detail.images) ? srtingToLink(item.car_detail.images) : bg} 
                                               alt="" 
                                               layout="fill" 
                                               objectFit="cover" 
                                               className='rounded-xl w-full h-full' 
                                        />
                                    </div>

                                    <div className="flex flex-col items-start justify-start pt-3 gap-4 w-full">
                                        <div className="flex flex-col items-start justify-start gap-3">
                                            <div className="relative leading-[17px] font-medium">{item.type} {item.name}</div>
                                            <div className="flex flex-row items-center justify-start gap-1.5 text-xs">
                                                <Image className="w-4 h-4" width={16} height={16} alt="" src={iconLocation} />
                                                <div className="relative leading-[17px]">
                                                    <span className="font-medium text-iconcolor">4.8 (2,436 reviews) </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center justify-between w-full text-sm text-dimgray border-t border-line pt-4">
                                            <div className="relative leading-[17px]">Price</div>
                                            <div className="relative leading-[17px] text-base text-gray-200">
                                                <span className="font-semibold">{item.rental_fee} VND</span><span className="text-sm text-darkgray-100">/day</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                            )}
                        </div>
                    </div>

                    <div className='w-[850px] flex flex-col bg-white rounded-xl p-[32px] gap-4'>
                        <div className='flex flex-row items-center justify-start gap-1'>
                            {/* <Image src={star} alt={''} className='w-4 h-4 relative'></Image> */}
                            <span>⭐</span>
                            <p className='font-medium text-md'> {calculateAverage(review).toFixed(1)} - </p>
                            <p className='text-md'> {review.length} Đánh giá </p>
                        </div>

                        <div className='relative flex flex-col items-center justify-between gap-2'>
                            {review.map((item) =>
                            (<div className="w-full h-[79px] flex flex-row items-center justify-center gap-4 border border-smoke rounded-lg p-4">
                                <Image className="rounded-full w-[80px] h-[80px] object-cover" width={44} height={44} alt="" src={item.user.image ? item.user.image : icon} />
                                <div className='w-full flex flex-col gap-2'>
                                    <div onClick={() => handleUser(item.user.id)} className="h-[23px] flex flex-col items-start justify-start ">
                                        <b className="w-32 relative tracking-[-0.03em] leading-[150%] flex items-center h-7 shrink-0"> {item.user.name} XYZ</b>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-between gap-2 text-right text-secondary-300">
                                        <div className="overflow-hidden flex flex-row items-center justify-start gap-0.5">
                                            {Array.from({ length: Math.round(item.vote) }, (_, index) => (
                                                <span key={index}>⭐</span>
                                            ))}
                                        </div>
                                        {/* <div className="relative tracking-[-0.02em] leading-[150%] font-medium flex flex-row items-center justify-end shrink-0">22 July 2022</div> */}
                                    </div>
                                </div>
                            </div>)
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
};

export default Owner;
