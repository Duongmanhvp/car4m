import Image from "next/image";
import imageAsset1 from './assets/imgs/Frame.svg'

const Header = () => {
      return (
              <header className="flex items-center justify-center" >
                <div className="w-full git bg-primary-0 border-lightsteelblue border-[1px] border-solid box-border h-[123px] overflow-hidden text-left text-base text-darkslategray font-poppins">
                        <div className="absolute top-[40px] w-[1120px] flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center justify-start gap-2 text-primary">
                                                <Image className="w-6 relative h-[25.7px] overflow-hidden shrink-0" alt="" src={imageAsset1} />
                                        <div className="relative leading-[150%] font-semibold">CAR4M</div>
                                </div>
                                <div className="flex flex-row items-center justify-center gap-10">
                                        <div className="relative leading-[150%] font-medium">Trở thành chủ xe</div>
                                        <div className="relative leading-[150%] font-medium">Thuê xe</div>
                                        <div className="relative leading-[150%] font-medium">Về car4m</div>
                                </div>
                                <div className="flex flex-row items-center justify-start gap-6">
                                        <div className="relative leading-[150%] font-medium">Đăng nhập</div>
                                        <div className="rounded-lg bg-primary flex flex-row items-center justify-center py-4 px-8 text-primary-0">
                                                <div className="w-[77px] relative leading-[150%] font-medium inline-block shrink-0"> Đăng ký</div>
                                        </div>
                                </div>
                        </div>
                </div>
              </header>
              );
};

export default Header;

