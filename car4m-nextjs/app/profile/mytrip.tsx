'use client'

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fetchMyCar, fetchMyLike } from '../services/CarServices';
import Image from 'next/image';
import bg from "../assets/imgs/bg.png"
import iconLocation from "../assets/imgs/location.svg"
import { useRouter } from 'next/navigation';

const MyTrip: NextPage = () => {

	const [items, setItem] = useState<any[]>([])

	const getCar = async () => {
		try {
			const res = await fetchMyLike()
			setItem(res.data.content)
		} catch (error) {
			console.log('Loi khi lay du lieu car', error)
		}
	}

	useEffect(() => {
		getCar()
	}, [])

	const router = useRouter()
	const handleInfoCar = (id: number) => {
		router.push(`/car?carID=${id}`);
	}

	return (
		<div className='bg-whitesmoke w-full flex flex-col font-baloo-2 px-2 gap-2'>
			<div className='text-xxl text-left flex flex-row items-center justify-between w-full'>
				<span>Danh sách yêu thích của tôi</span>
			</div>
			<div className="flex flex-col items-center justify-center bg-whitesmoke font-baloo-2 gap-2 p-2">
				{items.map((item) =>
				(<div onClick={() => handleInfoCar(item.id)} className='cursor-pointer w-[720px] rounded-xl border border-smoke'>
					<div className="rounded-xl bg-white p-2 flex flex-row items-start justify-between text-left text-base text-gray gap-3">
						<div className="w-1/2 p-2 relative rounded-xl bg-smoke h-[155px]">
							<Image src={item.car_detail.images ? item.car_detail.images : bg} alt="" layout="fill" objectFit="cover" className='rounded-xl' />
						</div>

						<div className="flex flex-col pt-3 gap-4 w-full">
							<div className="flex flex-col items-start justify-start gap-3">
								<div className="flex flex-row w-full justify-between relative leading-[17px] font-medium text-xx">
									<span>{item.type} {item.name}</span>
								</div>
								<div className="flex flex-row items-center justify-start gap-1.5 text-xs">
									<Image className="w-4 h-4" width={16} height={16} alt="" src={iconLocation} />
									<div className="relative leading-[17px]">
										<span className="font-medium text-iconcolor"> ... </span>
									</div>
								</div>
								<div className="flex flex-row items-center justify-between gap-2">
									<span className="text-sm bg-blue-100 px-2 rounded-[100px]">{item.car_detail.transmission == "MT" ? "Số sàn" : "Số tự động"}</span>
									<span className="text-sm bg-green-100 px-2 rounded-[100px]">Thuê giờ</span>
									<span className="text-sm bg-whiteblue px-2 rounded-[100px]">Miễn thế chấp</span>
								</div>
							</div>

							<div className="flex flex-row items-center justify-between w-full text-dimgray border-t border-line pt-4 pr-1">
								<div className="relative leading-[17px]">Giá</div>
								<div className="relative leading-[17px] text-gray-200">
									<span className="font-medium">{item.rental_fee} VND</span>
									<span className="text-darkgray-100">/giờ</span>
								</div>
							</div>
						</div>
					</div>
				</div>)
				)}
			</div>
		</div>
	);
};

export default MyTrip