'use client'
import type { NextPage } from 'next';

import Image, { StaticImageData } from 'next/image';
import mapv2 from '../assets/imgs/map-v2.png'
import blt from "../assets/imgs/bluetooth.png"
import camht from  "../assets/imgs/dash_camera.png"
import camlui from "../assets/imgs/reverse_camera.png"
import cambien from  "../assets/imgs/tpms-v2.png"
import vacham from "../assets/imgs/impact_sensor-v2.png"
import gps from "../assets/imgs/gps-v2.png"
import etc from "../assets/imgs/etc-v2.png"
import cam360 from "../assets/imgs/camera-360.png"
import camcl from "../assets/imgs/parking_camera.png"
import tocdo from "../assets/imgs/head_up-v2.png"
import cuaso from  "../assets/imgs/sunroof-v2.png"
import ghetre from  "../assets/imgs/babyseat-v2.png"
import usb from "../assets/imgs/usb-v2.png"
import lop from '../assets/imgs/spare_tire-v2.png'
import dvd from "../assets/imgs/dvd-v2.png"
import bantai from "../assets/imgs/bonnet-v2.png"
import tuikhi from "../assets/imgs/airbags-v2.png"


// import icon from '../assets'

const iconMapping: Record<string, StaticImageData> = {
    "Bản đồ": mapv2,
    "Bluetooth": blt,
    "Camera hành trình": camht,
    "Camera lùi": camlui,
    "Cảm biến lốp": cambien,
    "Cảm biến va chạm": vacham,
    "Định vị GPS": gps,
    "ETC": etc,
    "Camera 360": cam360, 
    "Camera cập lề": camcl,
    "Cảnh báo tốc độ":  tocdo,
    "Cửa sổ trời":cuaso,
    "Ghế trẻ em":ghetre,
    "Khe cắm USB":usb,
    "Lốp dự phòng": lop,
    "Màn hình DVD": dvd,
    "Nắp thùng xe bán tải": bantai, 
    "Túi khí an toàn": tuikhi
}

interface FeatureProps {
    features: string[]
}

const FrameFeature: React.FC<FeatureProps> = ({features}) => {

    return (
        <div className="w-full relative flex items-center shrink-0 text-base">
            <div className="grid grid-cols-4 gap-3">
                {features.map((feature) => {
                    const icon = iconMapping[feature]; // Tra cứu icon từ name
                    return (
                        <div className="flex flex-row items-center text-center gap-2">
                            {icon && (
                                <Image src={icon} alt="" className="w-8 h-8" />
                            ) }
                            <span>{feature}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default FrameFeature