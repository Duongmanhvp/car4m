'use client'

import React from "react";
import Image from 'next/image';
import iconLocation from "../assets/imgs/location.svg";

import bg from '@/app/assets/imgs/bg.png'
import { use, useEffect, useState } from 'react';
import { fetchOwner } from '@/app/services/UserServices';
import { fetchCarUser } from '@/app/services/CarServices';
import axios from "axios";

const OPEN_CAGE_API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY
const linkImg = process.env.NEXT_PUBLIC_LINK

export function Product({ item }: { item: any }) {
    const [data, setData] = useState('')

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
            setData(response.data.results[0].formatted)
        } catch (error) {
            console.error("Lỗi khi lấy địa chỉ từ tọa độ:", error);
        }
    }

    const srtingToLink = (images: string) => {
        const image = images.split(",");
        return linkImg + image[0];
    };

    useEffect(() => {
        getLocation(item.location.latitude, item.location.longitude)
    }, [item.location.latitude, item.location.longitude])

    //console.log(customer)

    return (
        <div className="rounded-xl bg-white p-2 flex flex-col items-start justify-start text-left text-base text-gray">
            <div className="w-full p-2 relative rounded-xl bg-smoke h-[155px]">
                <Image
                    src={item.car_detail.images ? srtingToLink(item.car_detail.images) : bg}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                />
            </div>

            <div className="w-full flex flex-col items-start justify-start pt-3 gap-4 w-full">
                <div className="w-full flex flex-col items-start justify-start gap-3">
                    <div className="relative leading-[17px] font-medium text-md">
                        {item.type} {item.name}
                    </div>
                    <div className="w-full flex flex-row items-center justify-start gap-1.5">
                        <Image
                            className="w-4 h-4"
                            width={16}
                            height={16}
                            alt=""
                            src={iconLocation}
                        />
                        
                            <p className="truncate">
                                {data}
                            </p>
                        
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between w-full text-sm text-dimgray border-t border-line pt-4">
                    <div className="relative leading-[17px]">Giá</div>
                    <div className="relative leading-[17px] text-base text-gray-200">
                        <span className="font-semibold">{item.rental_fee} VND</span>
                        <span className="text-sm text-darkgray-100">/giờ</span>
                    </div>
                </div>

                
            </div>
        </div>
    );
}
