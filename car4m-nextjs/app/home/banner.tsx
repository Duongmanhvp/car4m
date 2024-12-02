'use client'

import type { NextPage } from 'next'
import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

import time from "../assets/imgs/calendar.svg"
import location1 from "../assets/imgs/location.svg"
import vector from "../assets/imgs/Vector1.svg"
import bg from "../assets/imgs/bg.jpeg"
import routing from "../assets/imgs/routing.svg"
import LocationSelect from '../location/page'
import {useRouter} from 'next/navigation'


const Banner: NextPage = () => {

	const router = useRouter();

	const [isRadiusOpen, setIsRadiusOpen] = useState(false);
	const [selectedRadius, setSelectedRadius] = useState(0);
	const [isDateOpen, setIsDateOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [isLocationOpen, setIsLocationOpen] = useState(false)
	const [location, setLocation] = useState<string>('Vị trí của bạn');

	const toggleLocationFrame = () => setIsLocationOpen(!isLocationOpen);
	const handleLocationSelect = (selectedLocation: string) => {
		setLocation(selectedLocation);
	};

	// Mở hoặc đóng frame
	const toggleRadiusFrame = () => setIsRadiusOpen(!isRadiusOpen);
	const handleRadiusSelect = (radius: number) => {
		setSelectedRadius(radius);
		setIsRadiusOpen(false); // Đóng frame sau khi chọn
	};

	const toggleDateFrame = () => setIsDateOpen(!isDateOpen);

	const handleSearch = () => {
		console.log('lau vl')
        router.push(`/search?location=${encodeURIComponent(location)}&radius=${selectedRadius}`);
    };

	return (
		<div className="w-full flex flex-col justify-center items-center bg-white overflow-hidden text-left text-base text-darkslategray font-baloo-2">
			<div className="relative flex flex-col justify-center items-center  w-[1120px] overflow-hidden">
				<div className="relative w-full text-[48px] text-gray font-baloo">
					<Image className="relative w-full h-[552px] object-cover rounded-xl" alt="" src={bg} />
					<div className="absolute top-[0px] w-[369px] h-[134.6px]">
						<div className="absolute top-[30px] left-[50px] w-[369px] h-[101.2px] flex flex-col items-start justify-center">
							<div className="w-[365px] relative leading-[100%] flex items-center h-[99px] shrink-0">
								<span className="w-full">
									<span>Tìm, chọn và thuê xe</span>
									<span className="text-primary"> Dễ dàng</span>
								</span>
							</div>
						</div>
						<Image className="relative top-[104px] left-[266px] w-[134.2px] h-[49.4px] object-contain" alt="" src={vector} />
					</div>
				</div>
				<div className="relative justify-center items-center top-[-35px] left-[0px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl bg-white w-[920px] flex flex-row items-center justify-start py-3 pl-8 pr-3 box-border gap-[50px]">
					<div onClick={toggleLocationFrame} className="flex-[1] flex flex-row items-center justify-start gap-4 cursor-pointer">
						<Image className="w-8 relative h-8" alt="" src={location1} />
						<div className="h-[37px] flex flex-col items-start justify-center gap-0.5">
							<div className="relative leading-[150%] font-medium text-darkgray text-silver flex items-center h-5 shrink-0">Vị trí</div>
							<div className="truncate overflow-hidden whitespace-nowrap w-[150px] self-stretch relative leading-[150%] font-medium flex items-center h-[15px] shrink-0">
								{location ? location : 'Vị trí của bạn'}
							</div>
						</div>
					</div>
					{isLocationOpen && (
						<LocationSelect onLocationSelect={handleLocationSelect} onToggleLocationFrame={toggleLocationFrame} />
					)}
					<div onClick={toggleRadiusFrame} className="flex-[1] border-darkgray border-l-[1px] border-solid flex flex-row items-center justify-start py-0 pl-6 pr-0 gap-4 cursor-pointer">
						<Image className="w-8 relative h-8" alt="" src={routing} />
						<div className="h-[37px] flex flex-col items-start justify-center gap-0.5">
							<div className="relative leading-[150%] font-medium text-darkgray text-silver flex items-center h-5 shrink-0">Bán kính</div>
							<div className="self-stretch relative leading-[150%] font-medium flex items-center h-[15px] shrink-0">{selectedRadius} Km</div>
						</div>
					</div>
					{isRadiusOpen && (
						<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10" onClick={toggleRadiusFrame}>
							<div className="bg-white rounded-lg p-6 w-[300px] shadow-lg relative z-20" onClick={(e) => e.stopPropagation()}>
								<h2 className="text-lg font-medium text-center mb-4">Chọn bán kính</h2>
								<ul className="space-y-2">
									<li className="cursor-pointer text-center hover:bg-smoke p-2 rounded" onClick={() => handleRadiusSelect(1)}>1 km</li>
									<li className="cursor-pointer text-center hover:bg-smoke p-2 rounded" onClick={() => handleRadiusSelect(5)}>5 km</li>
									<li className="cursor-pointer text-center hover:bg-smoke p-2 rounded" onClick={() => handleRadiusSelect(10)}>10 km</li>
									<li className="cursor-pointer text-center hover:bg-smoke p-2 rounded" onClick={() => handleRadiusSelect(20)}>20 km</li>
								</ul>
								<button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg" onClick={toggleRadiusFrame}>
									Đóng
								</button>
							</div>
						</div>
					)}
					<div onClick={toggleDateFrame} className="cursor-pointer flex-[1] border-darkgray border-l-[1px] border-solid box-border h-[37px] flex flex-row items-center justify-start py-0 pl-6 pr-0 gap-4">
						<Image className="w-8 relative h-8" alt="" src={time} />
						<div className="flex flex-col items-start justify-center gap-0.5">
							<div className="relative leading-[150%] font-medium text-darkgray text-silver flex items-center h-5 shrink-0">Chọn ngày</div>
							<div className="self-stretch relative leading-[150%] font-medium flex items-center h-[15px] shrink-0">{selectedDate ? selectedDate.toLocaleDateString() : 'Chọn ngày'}</div>
						</div>
					</div>
					{isDateOpen && (
						<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 font-baloo-2" onClick={toggleDateFrame}>
							<div className="flex-col items-center justify-center bg-white rounded-lg p-6 shadow-lg relative z-20" onClick={(e) => e.stopPropagation()}>
								<button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center border border-dimgray rounded-full" onClick={toggleDateFrame}>
									<span className="text-dimgray font-semibold">&#x2715;</span>
								</button>
								<h2 className="text-lg font-medium text-center mb-4">Chọn ngày</h2>
								<div className='items-center justify-center font-baloo-2 font-medium' >
									<DatePicker
										selected={selectedDate}
										onChange={(newDate) => setSelectedDate(newDate)}
										inline
										className='items-center justify-center font-baloo-2'
									/>
								</div>
								<button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg font-baloo-2 font-medium" onClick={toggleDateFrame}>
									Tiếp tục
								</button>
							</div>
						</div>
					)}
					<div className="cursor-pointer w-[159px] rounded-lg bg-primary h-12 flex flex-row items-center justify-center p-2 box-border text-white">
						<div className="relative leading-[150%] font-medium">
							<div className="relative leading-[150%] font-medium" onClick={() => handleSearch()}>
								Tìm Kiếm
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>);
};

export default Banner;
