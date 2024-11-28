'use client'

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { deleteCar, fetchMyCar } from '../services/CarServices';
import Image from 'next/image';
import bg from "../assets/imgs/bg.png"
import iconLocation from "../assets/imgs/location.svg"
import { useRouter } from 'next/navigation';
import iedit from '../assets/imgs/edit-2.svg'

const FrameCar: NextPage = () => {
	const [edit, setEdit] = useState(false)
	const [items, setItem] = useState<any[]>([])
	const [list, setList] = useState<number[]>([])

	const toggleList = (id: number) => {
        setList((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		  );
    }

	const getCar = async () => {
		try {
			const res = await fetchMyCar()
			setItem(res.data.content)
		} catch (error) {
			console.log('Loi khi lay du lieu car', error)
		}
	}

	const handleDeleteCar = async () => {
		try {
			const response = await Promise.all(list.map((item, index) => {
				deleteCar(item)
				list.splice(index, 1)
			}))
		} catch (error) {
			console.log('Loi khi xoa car', error)
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
				<span>Danh sách xe của tôi</span>
				<div onClick={() => setEdit(!edit)} className="w-[119px] h-[40px] cursor-pointer rounded-lg bg-red flex flex-row items-center justify-center text-base text-white">
					<a onClick={handleDeleteCar}  className="w-[89px] relative leading-[150%] flex items-center justify-center shrink-0">{edit ? 'Xóa' : 'Chỉnh sửa'}</a>
					<Image className="w-4 relative h-4" alt="" src={iedit} />
				</div>
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
									{edit && (
										<input type="checkbox" checked={list.includes(item.id)} onChange={() => toggleList(item.id)}/>
									)}
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

export default FrameCar;
