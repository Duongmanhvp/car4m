import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import time from "../assets/imgs/calendar.svg"
import location from "../assets/imgs/location.svg"
import car from "../assets/imgs/car21.png"
import vector from "../assets/imgs/Vector1.svg"
import bg from "../assets/imgs/bg.jpeg"

const Banner: NextPage = () => {
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
					<div className="flex-[1] flex flex-row items-center justify-start gap-4">
						<Image className="w-8 relative h-8" alt="" src={location} />
						<div className="h-[37px] flex flex-col items-start justify-center gap-0.5">
							<div className="w-[46px] relative leading-[150%] font-medium flex items-center h-5 shrink-0">Vị trí</div>
							<div className="self-stretch relative text-sm leading-[150%] text-silver flex items-center h-[15px] shrink-0">Vị trí của bạn</div>
						</div>
					</div>
					<div className="flex-[1] border-darkgray border-l-[1px] border-solid flex flex-row items-center justify-start py-0 pl-6 pr-0 gap-4">
						<Image className="w-8 relative h-8" alt="" src={time} />
						<div className="h-[37px] flex flex-col items-start justify-center gap-0.5">
							<div className="w-[115px] relative leading-[150%] font-medium flex items-center h-5 shrink-0">Chọn ngày</div>
							<div className="self-stretch relative text-sm leading-[150%] text-silver flex items-center h-[15px] shrink-0">Tue 15 Feb, 09:00</div>
						</div>
					</div>
					<div className="flex-[1] border-darkgray border-l-[1px] border-solid box-border h-[37px] flex flex-row items-center justify-start py-0 pl-6 pr-0 gap-4">
						<Image className="w-8 relative h-8" alt="" src={time} />
						<div className="flex flex-col items-start justify-center gap-0.5">
							<div className="w-[68px] relative leading-[150%] font-medium flex items-center h-5 shrink-0">Ngày trả</div>
							<div className="w-[184px] relative text-sm leading-[150%] text-silver flex items-center h-[15px] shrink-0">Thu 16 Feb, 11:00</div>
						</div>
					</div>
					<div className="w-[159px] rounded-lg bg-primary h-12 flex flex-row items-center justify-center p-2 box-border text-white">
						<div className="relative leading-[150%] font-medium">
							<Link legacyBehavior href="/search" >
								Tìm Kiếm
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>);
};

export default Banner;
