'use client'

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fetchMyCar } from '../services/CarServices';
import Image from 'next/image';
import bg from "../assets/imgs/bg.png"
import iconLocation from "../assets/imgs/location.svg"
import { useRouter } from 'next/navigation';

const FrameCar: NextPage = () => {

	const [items, setItem] = useState<any[]>([])

	const getCar = async () => {
		try {
			const res = await fetchMyCar()
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
		<div className='text-xxl text-left flex justify-start'>
            Danh sách xe của tôi
        </div>
        <div className="flex items-center justify-center grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-whitesmoke font-baloo-2">
			{items.map((item) =>
			(<div onClick={() => handleInfoCar(item.id)} className='cursor-pointer min-w-[240px] max-w-[500px] rounded-xl border border-smoke'>
				<div className=" rounded-xl bg-white p-2 flex flex-col items-start justify-start text-left text-base text-gray">
					<div className="w-full p-2 relative rounded-xl bg-smoke h-[155px]">
						<Image src={item.car_detail.images ? item.car_detail.images : bg} alt="" layout="fill" objectFit="cover" className='rounded-xl' />
					</div>

					<div className="flex flex-col items-start justify-start pt-3 gap-4 w-full">
						<div className="flex flex-col items-start justify-start gap-3">
							<div className="relative leading-[17px] font-medium">{item.type} {item.name}</div>
							<div className="flex flex-row items-center justify-start gap-1.5 text-xs">
								<Image className="w-4 h-4" width={16} height={16} alt="" src={iconLocation} />
								<div className="relative leading-[17px]">
									<span className="font-medium text-iconcolor"></span>
								</div>
							</div>
						</div>

						<div className="flex flex-row items-center justify-between w-full text-sm text-dimgray border-t pt-4">
							<div className="relative leading-[17px]">Price</div>
							<div className="relative leading-[17px] text-base text-gray-200">
								<span className="font-semibold">{item.rental_fee}k VND</span><span className="text-sm text-darkgray-100">/day</span>
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

export default FrameCar;
