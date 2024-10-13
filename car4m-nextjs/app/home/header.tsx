import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import frame from "../assets/imgs/Frame.svg"
import logo from "../assets/imgs/logo.png"

const Header: NextPage = () => {
	return (
		<div className="w-full flex justify-center relative bg-primary-0 border-lightsteelblue h-[123px] overflow-hidden text-left text-base text-darkslategray font-baloo-2">
			<div className="absolute top-[40px]  w-[1120px] flex flex-row items-center justify-between">
				<div className="flex flex-row items-center justify-start gap-2 text-center text-primary font-baloo">
					<a href="/home" className="flex flex-row items-center justify-start gap-2 text-center text-primary font-baloo">
						<Image className="w-12 relative h-[50] overflow-hidden shrink-0" alt="" src={frame} />
						<Image className="w-20 relative h-[40] overflow-hidden shrink-0" alt="" src={logo} />
					</a>
				</div>
				<div className="flex flex-row items-center justify-center gap-10">
					<div className="relative leading-[150%] font-medium">Trở thành chủ xe</div>
					<div className="relative leading-[150%] font-medium">Thuê xe</div>
					<div className="relative leading-[150%] font-medium">Về car4m</div>
				</div>
				<div className="flex flex-row items-center justify-start gap-6">
					<div className="relative leading-[150%] font-medium">
						<Link legacyBehavior href="/signin">
							<a className="btn-accent hover-up-2">Đăng nhập</a>
						</Link>
					</div>
					<div className="rounded-lg bg-primary flex flex-row items-center justify-center py-4 px-8 text-center text-primary-0 hover-effect">
						<div className="w-[77px] relative leading-[150%] font-medium flex items-center justify-center shrink-0 text-white">
							<Link legacyBehavior href="/signup">
								<a className="btn-primary">Đăng ký</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>);
};

export default Header;
