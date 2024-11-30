'use client'

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fetchCarOrder } from '../services/CarServices';
import Image from 'next/image';
import bg from "../assets/imgs/bg.png"
import iconLocation from "../assets/imgs/location.svg"
import { useRouter } from 'next/navigation';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { format } from 'date-fns'
import ReivewFrame from './review';

const MyTrip: NextPage = () => {
	const [filter, setFilter] = useState("4")
	const [items, setItem] = useState<any[]>([])
	const [rate, setRate] = useState(0)

	const toggleFrame = (id: number) => setRate(id)

	const srtingToLink = (images: string) => {
		let image: string[] = images.split(',')
		return image[0]
	}

	const getOrder = async () => {
		try {
			const res = await fetchCarOrder()
			setItem(res.data.content)
		} catch (error) {
			console.log('Loi khi lay du lieu car', error)
		}
	}

	useEffect(() => {
		getOrder()
	}, [])

	const router = useRouter()
	const handleInfoCar = (id: number) => {
		router.push(`/car?carID=${id}`);
	}

	return (
		<div className='bg-whitesmoke w-full flex flex-col font-baloo-2 px-2 gap-2'>
			<div className='flex flex-col w-full'>
				<div className='text-xxl text-left flex flex-row items-center justify-between w-full'>
					<span className='flex flex-row gap-2'>
						Danh sách chuyến của tôi
					</span>
					<div className="flex flex-row items-center justify-between gap-2 text-xl">
						<span>Trạng thái:</span>
						<div className='text-xl '>
							<select className='p-1 px-2 border border-silver rounded font-medium bg-white cursor-pointer'
								value={filter}
								onChange={(e) => setFilter(e.target.value)}
							>
								<option value="4"> Chọn </option>
								<option value="0"> Tất cả </option>
								<option value="1"> Chuyến sắp tới </option>
								<option value="2"> Chuyến hiện tại </option>
								<option value="3"> Chuyến đã xong </option>
							</select>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center bg-whitesmoke font-baloo-2 gap-2 p-2">
					{items.map((item) => {
						const date = new Date()
						let check: String = '0'
						if (new Date(item.receive_date) > date) check = '1'
						if (new Date(item.return_date) < date) check = '3'
						if (new Date(item.receive_date) <= date && date <= new Date(item.return_date)) check = '2'

						if (filter == check || filter == '0')
							return (<div className='cursor-pointer w-[720px] rounded-xl border border-smoke flex flex-col justify-between bg-white'>
								<div onClick={() => handleInfoCar(item.car_id)} className="rounded-xl bg-white p-2 flex flex-row items-start justify-between text-left text-base text-gray gap-3">
									<div className="w-1/2 p-2 relative rounded-xl bg-smoke h-[155px]">
										<Image src={item.car_detail.images ? srtingToLink(item.car_detail.images) : bg} alt="" layout="fill" objectFit="cover" className='rounded-xl' />
									</div>

									<div className="flex flex-col pt-2 gap-2 w-full">
										<div className="flex flex-col items-start justify-start gap-2">
											<div className="flex flex-row w-full justify-between relative leading-[17px] font-medium text-xx">
												<span>{item.type} {item.name}</span>
											</div>
											<div className="flex flex-row items-center justify-start gap-1 px-2.5 text-xs">
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

											<div className="flex flex-row items-center justify-between gap-2">
												<span className="relative leading-[17px]">Giá</span>
												<span className="font-medium">{item.rental_fee} VND</span>
												<span className="text-darkgray-100">/giờ</span>
											</div>
										</div>

										<div className="flex flex-row items-center justify-between w-full text-dimgray border-t border-line pt-1 pr-1">
											<div className="relative flex flex-row items-center justify-center gap-2">
												<span className="">Nhận: </span>
												<span className="text-xl font-medium text-primary"> {format(item.receive_date, 'dd-MM-yyyy HH:mm')} </span>
											</div>
											<div className="relative flex flex-row items-center justify-center gap-2">
												<span className="">Trả: </span>
												<span className="text-xl font-medium text-primary"> {format(item.return_date, 'dd-MM-yyyy HH:mm')} </span>
											</div>
										</div>
									</div>
								</div>
								{check == '1' &&
									(<div className='w-full flex items-end justify-end p-2'>
										<div className='border border-lowblue text-lowblue rounded-lg p-1 px-2'>
											Chuyến sắp tới
										</div>
									</div>)
								}

								{check == '2' &&
									(<div className='w-full flex items-end justify-end p-2'>
										<div className='border border-green-500 text-green-500 rounded-lg p-1 px-2'>
											Đang thuê
										</div>
									</div>)
								}

								{check == '3' &&
									(<div className='w-full flex flex-row items-end justify-end p-2 gap-2'>
										<div className='border border-silver text-dimgray rounded-lg p-1 px-2'>
											Hoàn thành
										</div>
										<div onClick={() => toggleFrame(item.rental_id)} className='hover:bg-lightred hover:font-medium border border-red text-red rounded-lg p-1 px-2'>
											Đánh giá
										</div>

										{rate == item.rental_id && (<ReivewFrame rental_id={item.rental_id} onToggleFrame={toggleFrame}/>)}
									</div>)
								}
							</div>)
					})}
				</div>

			</div>

		</div>
	);
};

export default MyTrip
