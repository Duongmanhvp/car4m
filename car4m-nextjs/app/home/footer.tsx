import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import frame from "../assets/imgs/Frame.svg"
import logo from "../assets/imgs/logo.png"


const Footer: NextPage = () => {
    return (
        <div className="w-full relative bg-primary-0 h-[480px] overflow-hidden text-left text-[32px] text-primary font-baloo-2">
            <div className="absolute top-[calc(50%_-_212px)] left-[160px] w-[1120px] h-[331px] overflow-hidden">
                <div className="absolute top-[24px] left-[7px] flex flex-col items-start justify-start gap-2.5">
                    <div className="h-[33px] flex flex-row items-center justify-start gap-2">
                        <a href="/home" className="flex flex-row items-center justify-start gap-2 text-center text-primary font-baloo">
                            <Image className="w-12 relative h-[50] overflow-hidden shrink-0" alt="" src={frame} />
                            <Image className="w-20 relative h-[40] overflow-hidden shrink-0" alt="" src={logo} />
                        </a>
                    </div>
                    <div className="mt-2.5 w-[292px] relative text-base tracking-[-0.02em] leading-[150%] font-medium font-medium-type16 text-gray inline-block">Trang web cho thuê xe dễ dàng, uy tín, đảm bảo chất lượng</div>
                </div>
                <img className="absolute top-[328px] left-[0px] w-[1120px] h-[3px] object-contain" alt="" src="Line.svg" />
            </div>
        </div>);
};

export default Footer;
