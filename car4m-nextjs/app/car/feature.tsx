'use client'
import type { NextPage } from 'next';

const iconMapping: Record<string, string> = {
    "Bản đồ": "/icons/map.png",
    "Bluetooth": "/icons/bluetooth.png",
    "Camera hành trình": "/icons/dashcam.png",
    "Camera lùi": "/icons/rear-camera.png",
    "Cảm biến lốp": "/icons/tire-sensor.png",
    "Cảm biến va chạm": "/icons/collision-sensor.png",
    "Định vị GPS": "/icons/gps.png",
    "ETC": "/icons/etc.png",
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
                                <img src={icon} alt="" className="w-8 h-8" />
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