import Image from "next/image"
import logo from './assets/imgs/Frame.svg'


const Footer = () => {
      return (
            <div className="w-full flex items-center justify-center relative bg-primary-0 h-[480px] overflow-hidden text-left text-[32px] text-primary font-poppins">
                  <div className="absolute top-[calc(50%_-_212px)]  w-[1120px] h-[331px] overflow-hidden">
                        <div className="absolute top-[24px] left-[7px] flex flex-col items-start justify-start gap-2.5">
                              <div className="h-[33px] flex flex-row items-center justify-start gap-2">
                                    <Image className="w-8 relative h-8 overflow-hidden shrink-0" alt="" src={logo} />
                                    <div className="relative leading-[150%] font-semibold">CAR4M</div>
                              </div>
                              <div className="w-[292px] relative text-base tracking-[-0.02em] leading-[150%] font-medium font-medium-type16 text-gray-500 inline-block">Trang web cho thuê xe dễ dàng, uy tín, đảm bảo chất lượng</div>
                        </div>
                        {/* <img className="absolute top-[328px] left-[0px] w-[1120px] h-[3px] object-contain" alt="" src="Line.svg" /> */}
                  </div>
            </div>);
};

export default Footer;
