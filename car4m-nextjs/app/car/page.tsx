'use client'
import type { NextPage } from 'next';
import Image from "next/image";
import Header from '../home/header';
import { useEffect, useState } from 'react';
import { fetchCarInfo } from '../services/CarServices';
import { useSearchParams } from 'next/navigation';


const Car: NextPage = () => {
    const [carInfo, setCarInfo] = useState<any>(null)
    const searchParams = useSearchParams();

    const getCar = async () => {
        try {
            let res = await fetchCarInfo(Number(searchParams.get('id')))
            if (res && res.data) {
                setCarInfo(res.data)
            }
        } catch (error) {
            console.log('Loi khi lay du lieu', error)
        }
    }

    useEffect(() => {
        getCar()
    }, [])

    return (
        <section className="main flex flex-col justify-center items-center font-baloo-2">
            <Header />
            <div className="w-[1120px] relative flex flex-col items-center justify-center bg-white ">
                {/* <div className="relative w-full h-[518px] text-13xl text-white">
                    <div className="relavtive h-full w-[54.89%]  right-[45.11%] bottom-[0%] left-[0%] rounded-3xs bg-dodgerblue overflow-hidden">
                        <img className="relative  left-[-114px] w-[802px] h-[518px]" width={802} height={518} alt="" src="BG.svg" />
                        <div className="relavtive top-[56px] left-[22px] flex flex-col items-start justify-start gap-4">
                            <div className="w-[383px] relative tracking-[-0.03em] leading-[150%] font-semibold flex items-center">Xe thể thao có thiết kế và khả năng tăng tốc tốt nhất</div>
                            <div className="w-[284px] relative text-base tracking-[-0.02em] leading-[150%] font-medium flex items-center">
                                <span className="w-full">
                                    <p className="m-0">An toàn và thoải mái khi lái xe</p>
                                    <p className="m-0">xe thể thao tương lai và thanh lịch</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="relavtive h-[43.2%] w-[42.71%] right-[0%] bottom-[0.89%] left-[57.29%]">
                        <div className="relative h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-lg bg-white overflow-hidden">
                            <img className="relative top-[36.42px] left-[7.51px] w-[532px] h-[167px] object-contain" alt="" src="Car.png" />
                        </div>
                    </div>
                    <img className="relative h-[46.53%] w-[20.25%] top-[0.58%] right-[0.56%] bottom-[52.9%] left-[79.19%] rounded-3xs max-w-full overflow-hidden max-h-full object-cover" width={270} height={241} alt="" src="View 2.png" />
                    <img className="relative h-[46.53%] w-[19.95%] top-[0.58%] right-[22.76%] bottom-[52.9%] left-[57.29%] rounded-lg max-w-full overflow-hidden max-h-full object-cover" width={266} height={241} alt="" src="View 3.png" />
                </div> */}

                <div className='w-full h-[600px]'>

                </div>

                <div className="w-full relative flex flex-row justify-between gap-4">
                    <div className="w-full flex flex-col items-center justify-center gap-4 relative text-left text-xl text-black pr-2">
                        <div className="relative w-full border-silver border-b-[1px] border-solid box-border flex flex-col items-start justify-start py-4 text-[30px]">
                            <div className="w-[313px] h-[69px] flex flex-row items-center justify-start">
                                <div className="w-[245px] flex flex-col items-start justify-start gap-1">
                                    <b className="w-[245px] relative leading-[18px] flex items-center h-[26px] shrink-0">Sedan S 500</b>
                                    <div className="w-[133px] h-[18px] flex flex-row items-center justify-start gap-[9px] text-sm text-oil-11">
                                        <img className="w-4 relative rounded-[0.5px] h-4" width={16} height={16} alt="" src="Star 1.svg" />
                                        <div className="relative">4.9</div>
                                        <div className="relative text-[12px] text-gray-200">(23 Đánh giá)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full flex flex-col items-start justify-start py-2 border-silver border-b text-oil-11">
                            <div className="self-stretch flex flex-col items-start justify-center gap-2">
                                <b className="w-[380px] relative inline-block">Đặc điểm</b>
                                <div className="h-[80px] self-stretch overflow-x-auto shrink-0 flex flex-row items-center justify-between gap-6 text-[11px] text-darkslategray-200">
                                    <div className="flex-[1] relative shrink-0 ">
                                        <div className="relative  flex flex-col items-center justify-center gap-0.5 p-2">
                                            <div className='flex flex-row'>
                                                <img className="w-4 relative h-4" width={16} height={16} alt="" src="Vector.svg" />
                                                <b className="">Diesel</b>
                                            </div>
                                            <p className="m-0">Nhiên liệu thông thường</p>
                                        </div>
                                    </div>
                                    <div className="flex-[1] relative shrink-0">
                                        <div className="relative  flex flex-col items-center justify-center gap-0.5 p-2">
                                            <div className='flex flex-row'>
                                                <img className="w-4 relative h-4" width={16} height={16} alt="" src="Vector.svg" />
                                                <b className="">Ghế lạnh</b>
                                            </div>
                                            <p className="m-0">Kiểm soát nhiệt độ trên ghế</p>
                                        </div>
                                    </div>
                                    <div className="flex-[1] relative shrink-0 ">
                                        <div className="relative  flex flex-col items-center justify-center gap-0.5 p-2">
                                            <div className='flex flex-row'>
                                                <img className="w-4 relative h-4" width={16} height={16} alt="" src="Vector.svg" />
                                                <b className="">Gia tốc</b>
                                            </div>
                                            <p className="m-0">0 - 100km / 11s</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="relative border-silver border-b-[1px] border-solid box-border flex flex-col items-start justify-center py-2 gap-[15px]">
                            <div className="flex flex-row items-start justify-start">
                                <div className="w-[245px] flex flex-col items-start justify-start">
                                    <b className="w-[245px] relative leading-[18px] flex items-center h-[26px] shrink-0">
                                        <span className="w-full">
                                            <p className="m-0">Điều khoản</p>
                                        </span>
                                    </b>
                                </div>
                            </div>
                            <div className="w-full relative text-base leading-[15px] text-iconcolor flex items-center shrink-0">
                                <span className="w-full">
                                    <p className="[margin-block-start:0] [margin-block-end:7px]">Quy định khác:</p>
                                    <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Sử dụng xe đúng mục đích.</p>
                                    <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.</p>
                                    <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Không sử dụng xe thuê để cầm cố, thế chấp.</p>
                                    <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</p>
                                    <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Không chở hàng quốc cấm dễ cháy nổ.</p>
                                    <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Không chở hoa quả, thực phẩm nặng mùi trong xe.</p>
                                    <p className="[margin-block-start:0] [margin-block-end:7px]">◦ Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ hoặc gửi phụ thu phí vệ sinh xe.</p>
                                    <p className="m-0">Trân trọng cảm ơn, chúc quý khách hàng có những chuyến đi tuyệt vời !</p>
                                </span>
                            </div>
                        </div>
                        <div className="relative w-full border-silver border-b-[1px] border-solid box-border flex flex-col items-start justify-start py-2">
                            <div className="self-stretch h-[69px] flex flex-row items-center justify-start">
                                <div className="w-[676px] flex flex-col items-start justify-start gap-1">
                                    <b className="w-[245px] relative leading-[18px] flex items-center h-[26px] shrink-0">Vị trí xe</b>
                                    <div className="self-stretch h-[17px] flex flex-row items-center justify-start text-sm text-oil-11">
                                        <div className="w-[676px] relative inline-block shrink-0">...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full border-silver border-b-[1px] border-solid box-border flex flex-col items-start justify-start py-2 gap-4">
                            <div className=" top-[24px] left-[24px] flex flex-row items-start justify-start gap-3 text-xl">
                                <div className="w-20 relative tracking-[-0.02em] font-semibold flex items-center h-7 shrink-0">Đánh giá</div>
                                <div className="w-11 rounded bg-dodgerblue h-7 flex flex-row items-center justify-center py-0 px-5 box-border text-center text-sm text-primary-0">
                                    <b className="w-5 relative flex items-center justify-center h-4 shrink-0">23</b>
                                </div>
                            </div>
                            <div className="w-full h-[79px] flex flex-row items-center justify-center gap-4 border border-smoke rounded-lg p-4">
                                <img className="rounded-full w-[50px] h-[50px] object-cover" width={44} height={46} alt="" src="Profill.png" />
                                <div className='w-full flex flex-col gap-2'>
                                    <div className="h-[23px] flex flex-col items-start justify-start text-xl">
                                        <b className="w-32 relative tracking-[-0.03em] leading-[150%] flex items-center h-7 shrink-0">ABC</b>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-between gap-2 text-right text-secondary-300">
                                        <div className="overflow-hidden flex flex-row items-center justify-start gap-0.5">
                                            <img className="w-5 relative h-5 overflow-hidden shrink-0" width={20} height={20} alt="" src="ic-actions-star.svg" />
                                            <img className="w-5 relative h-5 overflow-hidden shrink-0" width={20} height={20} alt="" src="ic-actions-star.svg" />
                                            <img className="w-5 relative h-5 overflow-hidden shrink-0" width={20} height={20} alt="" src="ic-actions-star.svg" />
                                            <img className="w-5 relative h-5 overflow-hidden shrink-0" width={20} height={20} alt="" src="ic-actions-star.svg" />
                                            <img className="w-5 relative h-5 overflow-hidden shrink-0" width={20} height={20} alt="" src="ic-actions-star.svg" />
                                        </div>
                                        <div className="relative tracking-[-0.02em] leading-[150%] font-medium flex flex-row items-center justify-end shrink-0">21 July 2022</div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[79px] flex flex-row items-center justify-center gap-4 border border-smoke rounded-lg p-4">
                                <img className="rounded-full w-[50px] h-[50px] object-cover" width={44} height={46} alt="" src="Profill.png" />
                                <div className='w-full flex flex-col gap-2'>
                                    <div className="h-[23px] flex flex-col items-start justify-start text-xl">
                                        <b className="w-32 relative tracking-[-0.03em] leading-[150%] flex items-center h-7 shrink-0">XYZ</b>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-between gap-2 text-right text-secondary-300">
                                        <div className="overflow-hidden flex flex-row items-center justify-start gap-0.5">
                                            <img className="w-5 relative h-5 overflow-hidden shrink-0" width={20} height={20} alt="" src="ic-actions-star.svg" />
                                            <img className="w-5 relative h-5 overflow-hidden shrink-0" width={20} height={20} alt="" src="ic-actions-star.svg" />
                                            <img className="w-5 relative h-5 overflow-hidden shrink-0" width={20} height={20} alt="" src="ic-actions-star.svg" />
                                            <img className="w-5 relative h-5 overflow-hidden shrink-0" width={20} height={20} alt="" src="ic-actions-star.svg" />
                                            <img className="w-5 relative h-5 overflow-hidden shrink-0" width={20} height={20} alt="" src="ic-actions-star.svg" />
                                        </div>
                                        <div className="relative tracking-[-0.02em] leading-[150%] font-medium flex flex-row items-center justify-end shrink-0">22 July 2022</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded w-[132px] h-11 flex flex-row items-center justify-center box-border gap-2 text-center text-base text-secondary-300">
                                <div className="w-20 relative tracking-[-0.02em] leading-[150%] font-semibold flex items-center justify-center h-6 shrink-0">Xem tất cả</div>
                                <img className="w-4 relative h-4" width={16} height={16} alt="" src="vuesax/outline/arrow-down.svg" />
                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-col pt-4">
                        <div className="flex flex-row items-start justify-start gap-[158px]">
                            <div className="w-[111px] relative flex items-center h-11 shrink-0">
                                <span className="w-full">
                                    <span>Tổng </span>
                                    <span className="text-xs">(3 ngày)</span>
                                </span>
                            </div>
                            <b className="w-[111px] relative flex text-gray-200 text-right items-center h-11 shrink-0">6 triệu</b>
                        </div>
                        <div className="w-[380px] relative h-[58px] flex flex-row items-cneter justify-center text-center text-white bg-primary rounded-lg">
                            <div className="flex items-center justify-center">
                                Thuê ngay
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Car;
