'use client'

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fetchAllCar } from '../services/CarServices';
import Image from 'next/image';
import bg from "../assets/imgs/bg.png"
import iconLocation from "../assets/imgs/location.svg"
import { useRouter } from 'next/navigation';
import axios from 'axios';

const link = process.env.NEXT_PUBLIC_LINK
const OPEN_CAGE_API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY

type Location = {
	address: string
	latitude: number
	longitude: number
}

const Page: NextPage = () => {
	const [listLocation, setListLocation] = useState<Record<number, string>>({})
	const [items, setItem] = useState<any[]>([])
	const getCar = async () => {
		try {
			const respone = await fetchAllCar()
			setItem(respone.data.content)
			//console.log(respone.data.content)

			const res = await Promise.all(respone.data.content.map((item: { location: { latitude: number; longitude: number; }; id: number; }) => {
				const val = getLocation(item.location.latitude, item.location.longitude).then((post) => ({ carId: item.id, post }))
				return val
			}))
			res.forEach(({ carId, post }) => {
				listLocation[carId] = post
		 	})

		} catch (error) {
			console.log('Loi khi lay du lieu car', error)
		}
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
			return (response.data.results[0].formatted)
		} catch (error) {
			console.error("Lỗi khi lấy địa chỉ từ tọa độ:", error);
			return ("")
		}
	}

	const srtingToLink = (images: string) => {
		let image: string[] = images.split(',')
		return image[0]
	}

	useEffect(() => {
		getCar()
	}, [])

	const router = useRouter()
	const handleInfoCar = (id: number, image: string) => {
		router.push(`/car?carID=${id}`);
	}

	console.log(listLocation)

	return (
		<div className='bg-whitesmoke w-full flex flex-col font-baloo-2 items-center justify-center p-8 gap-2'>
			<h1 className='text-xxl text-black text-center font-medium p-4'>
				Xe dành cho bạn
			</h1>
			<div className="relative flex items-center justify-center w-[1120px] grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-whitesmoke font-baloo-2">
				{items.map((item) =>
				(<div onClick={() => handleInfoCar(item.id, item.car_detail.images)} className='cursor-pointer min-w-[255px] max-w-[500px] rounded-xl border border-smoke    '>
					<div className=" rounded-xl bg-white p-2 flex flex-col items-start justify-start text-left text-base text-gray">
						<div className="w-full p-2 relative rounded-xl bg-smoke h-[155px]">
							<Image src={srtingToLink(item.car_detail.images) ? srtingToLink(item.car_detail.images) : bg} alt="" layout="fill" objectFit="cover" className='rounded-xl' />
							{/* item.car_detail.images ? item.car_detail.images :  */}
						</div>

						<div className="flex flex-col items-start justify-start pt-3 gap-4 w-full">
							<div className="flex flex-col items-start justify-start gap-3">
								<div className="relative leading-[17px] font-medium">{item.type} {item.name}</div>
								<div className="flex flex-row items-center justify-start gap-1.5 text-xs">
									<Image className="w-4 h-4" width={16} height={16} alt="" src={iconLocation} />
									<div className="relative leading-[17px]">
										<span className="text-iconcolor truncate"> {listLocation[item.id]?.toString()}  </span>
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
		</div>
	);
};

export default Page;
