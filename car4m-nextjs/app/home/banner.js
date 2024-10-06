import imageAssets1 from './assets/imgs/car21.png'
import icon1 from './assets/imgs/location.svg'
import icon2 from './assets/imgs/calendar.svg'
import icon3 from './assets/imgs/Vector1.svg'
import Image from 'next/image'

const Banner = () => {
      return (
            <div className="w-full flex items-center justify-center relative bg-white h-[638px] overflow-hidden text-left text-base text-darkslategray font-poppins">
                  <div className="absolute top-[calc(50%_-_291px)] w-[1120px] h-[566px] overflow-hidden">
                        <div className="absolute top-[494px] left-[0px] shadow-[0px_6px_12px_rgba(19,_94,_172,_0.12)_inset] rounded-xl bg-white w-[1120px] flex flex-row items-center justify-start py-3 pl-8 pr-3 box-border gap-[50px]">
                              <div className="flex-1 flex flex-row items-center justify-start gap-4">
                                    <Image className="w-8 relative h-8" alt="" src={icon1} />
                                    <div className="w-52 h-[37px] flex flex-col items-start justify-center gap-0.5">
                                          <div className="w-[46px] relative leading-[150%] font-medium flex items-center h-5 shrink-0">Vị trí</div>
                                          <div className="self-stretch relative text-sm leading-[150%] text-silver flex items-center h-[15px] shrink-0">Tìm kiếm vị trí của bạn</div>
                                    </div>
                              </div>
                              <div className="flex-[1] border-l-[1px] border-gray-300 h-[37px] flex flex-row items-center justify-start py-0 pl-6 pr-0 gap-4">
                                    {/* <div className="flex left-0 top-0 h-full w-1 bg-gray-100" /> */}
                                    <Image className="w-8 relative h-8" alt="" src={icon2} />   
                                    <div className="w-[183px] h-[37px] flex flex-col items-start justify-center gap-0.5">
                                          <div className="w-[115px] relative leading-[150%] font-medium flex items-center h-5 shrink-0">Chọn ngày</div>
                                          <div className="self-stretch relative text-sm leading-[150%] text-silver flex items-center h-[15px] shrink-0">Tue 15 Feb, 09:00</div>
                                    </div>
                              </div>
                              <div className="flex-[1] border-l-[1px] border-gray-300 h-[37px] flex flex-row items-center justify-start py-0 pl-6 pr-0 gap-4">
                                    {/* <div className="flex left-0 top-0 h-full w-1 bg-blue-500" /> */}
                                    <Image className="w-8 relative h-8" alt="" src={icon2} />
                                    <div className="w-[183px] h-[37px] flex flex-col items-start justify-center gap-0.5">
                                          <div className="w-[115px] relative leading-[150%] font-medium flex items-center h-5 shrink-0">Ngay tra</div>
                                          <div className="self-stretch relative text-sm leading-[150%] text-silver flex items-center h-[15px] shrink-0">Tue 15 Feb, 09:00</div>
                                    </div>
                              </div>
                              <div className="w-[159px] rounded-lg bg-primary h-12 flex flex-row items-center justify-center p-2 box-border text-white">
                                    <div className="relative leading-[150%] font-medium">Tìm kiếm</div>
                              </div>
                        </div>
                        <div className="absolute top-[0px] left-[0px] w-[1112px] h-[458px] text-[48px] text-gray">
                              <div className="absolute top-[0px] left-[0px] w-[425px] h-[126px]">
                                    <div className="absolute top-[0px] left-[0px] h-[84.8px] flex flex-col items-start justify-start">
                                          <div className="w-[425px] relative leading-[100%] font-semibold inline-block">
                                                <span>Tìm, chọn và thuê xe</span>
                                                <span className="text-primary"> Dễ dàng</span>
                                          </div>
                                    </div>
                                    <Image className="absolute top-[76.61px] left-[246.34px] w-[134.2px] h-[49.4px] object-contain" alt="" src={icon3} />
                              </div>
                              <Image className="absolute top-[6px] left-[216px] w-[896px] h-[452px] object-cover" alt="" src={imageAssets1} />
                        </div>
                  </div>
            </div>);
};

export default Banner;
