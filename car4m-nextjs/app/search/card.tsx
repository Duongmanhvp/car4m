'use client'

import type { NextPage } from 'next';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { fetchCarByFilter, fetchCarByLocation } from "../services/CarServices";
import { useSearchParams } from 'next/navigation';
import iconLocation from "../assets/imgs/location.svg"
import bg from "../assets/imgs/bg.jpeg"
import {useRouter} from 'next/navigation'

interface CardProps {
    activeOverlay: string | null;
    selectedBrand: string | null;
    selectedSeats: number | null;
    selectedFuel: string | null;
    selectedTransmission: string | null;
    priceRange: [number, number] | null;
}

const Card: NextPage<CardProps> = ({
    activeOverlay,
    selectedBrand,
    selectedSeats,
    selectedFuel,
    selectedTransmission,
    priceRange,
}) => {

    const router = useRouter()
    const searchParams = useSearchParams();
    const [items, setItems] = useState<any[]>([]);
    const [listImage, setListImage] = useState<string[]>([])

    useEffect(() => {
        if (!activeOverlay) 
            getCar()
    }, [])

    useEffect(() => {
        if (activeOverlay) {
            getCarFilter()
        }
    }, [activeOverlay, selectedBrand, selectedSeats, selectedFuel, selectedTransmission, priceRange]);

    const getCar = async () => {
        let res = await fetchCarByLocation(String(searchParams.get('location')), Number(searchParams.get('radius')));
        if (res && res.data) {
            setItems(res.data.content)
            console.log(res.data.content)
        }

    }

    const getCarFilter = async () => {
        let res = await fetchCarByFilter(String(selectedBrand), 
                                         String(selectedFuel), 
                                         String(priceRange?.[0]), 
                                         String(priceRange?.[1]), 
                                         String(selectedSeats), 
                                         String(selectedTransmission),
                                         String(searchParams.get('location')),
                                         String(searchParams.get('radius')))
        if (res && res.data) {
            setItems(res.data.content)
        }                                 
    }

    const handleInfoCar = (id: number) => {
        router.push(`/car?carID=${id}`);
    }

    return (
        <div className="relative flex items-center justify-center top-[30px] w-[1120px] grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-whitesmoke font-baloo-2">
            {items.map((item) => 
            (<div onClick={() => handleInfoCar(item.id)} className='cursor-pointer min-w-[255px] max-w-[500px] rounded-xl border border-smoke    '>
                    <div className=" rounded-xl bg-white p-2 flex flex-col items-start justify-start text-left text-base text-gray">
                        <div className="w-full p-2 relative rounded-xl bg-smoke h-[155px]">
                            <Image src={item.car_detail.images ? item.car_detail.images : bg } alt="" layout="fill" objectFit="cover" className='rounded-xl'/>
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

                            <div className="flex flex-row items-center justify-between w-full text-sm text-dimgray border-t pt-4">
                                <div className="relative leading-[17px]">Price</div>
                                <div className="relative leading-[17px] text-base text-gray-200">
                                    <span className="font-semibold">{item.rental_fee} VND</span><span className="text-sm text-darkgray-100">/day</span>
                                </div>
                            </div>

                            <div className="rounded-lg bg-primary h-10 flex flex-row items-center justify-center p-2 gap-2 text-white mt-4">
                                <div className="relative leading-[17px] font-medium">Rent Now</div>
                                {/* <Image className="w-5 h-5" width={20} height={20} alt="" src="/vuesax/linear/arrow-right.svg" /> */}
                            </div>
                        </div>
                    </div>
            </div>)
            )}
        </div>
    );
};

export default Card;
