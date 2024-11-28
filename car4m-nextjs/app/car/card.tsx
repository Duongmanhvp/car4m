'use client'

import type { NextPage } from 'next';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { fetchCarByFilter, fetchCarByLocation } from "../services/CarServices";
import { useSearchParams } from 'next/navigation';
import iconLocation from "../assets/imgs/location.svg"
import bg from "../assets/imgs/bg.jpeg"
import { useRouter } from 'next/navigation'

type CardProps = {
    type: string
    name: string
    rental_fee: number
    images: string
    location: string
    id: number
    transmission: string
}

const FrameCard: React.FC<CardProps> = ({ type, name, rental_fee, images, location, id, transmission }) => {
    const [edit, setEdit] = useState(true)
    const [list, setList] = useState<number[]>([])

	const toggleList = (id: number) => {
        setList((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		  );
    }
    const srtingToLink = (images: string) => {
        let image: string[] = images.split(',')
        return image[0]
    }

    //console.log(list)

    return (
        <div className='cursor-pointer w-[720px] rounded-xl border border-smoke font-baloo-2'>
            <div className="rounded-xl bg-white p-2 flex flex-row items-start justify-between text-left text-base text-gray gap-3">
                <div className="w-1/2 p-2 relative rounded-xl bg-smoke h-[155px]">
                    <Image src={srtingToLink(images) ? srtingToLink(images) : bg} alt="" layout="fill" objectFit="cover" className='rounded-xl' />
                    {/* item.car_detail.images ? item.car_detail.images :  */}
                </div>

                <div className="flex flex-col pt-3 gap-4 w-full">
                    <div className="flex flex-col items-start justify-start gap-3">
                        <div className="flex flex-row w-full justify-between relative leading-[17px] font-medium text-xx">
                            <span>{type} {name} Mazda CX-5</span>
                            {/* {edit && (
										<input type="checkbox" checked={list.includes(id)} onChange={() => toggleList(id)}/>
									)} */}
                        </div>
                        <div className="flex flex-row items-center justify-start gap-1.5 text-xs">
                            <Image className="w-4 h-4" width={16} height={16} alt="" src={iconLocation} />
                            <div className="relative leading-[17px]">
                                <span className="font-medium text-iconcolor"> {location} </span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <span className="text-sm bg-blue-100 px-2 rounded-[100px]">{transmission == "MT" ? "Số sàn" : "Số tự động"}</span>
                            <span className="text-sm bg-green-100 px-2 rounded-[100px]">Thuê giờ</span>
                            <span className="text-sm bg-whiteblue px-2 rounded-[100px]">Miễn thế chấp</span>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between w-full text-dimgray border-t pt-4">
                        <div className="relative leading-[17px]">Giá</div>
                        <div className="relative leading-[17px] text-gray-200">
                            <span className="font-medium">{rental_fee}k VND</span>
                            <span className="text-darkgray-100">/giờ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrameCard