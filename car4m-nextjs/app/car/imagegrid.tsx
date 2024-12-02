import React from "react";
import Image from "next/image";

type ImageProps = {
    images: string[];
};

const linkImg = process.env.NEXT_PUBLIC_LINK

const ImageGrid: React.FC<ImageProps> = ({ images }) => {
    return (
        // <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        //     {images.map((image, index) => (
        //         <div key={index} className="relative">
        //             <img
        //                 src={linkImg + image}
        //                 className="w-full h-auto rounded-lg shadow-md object-cover"
        //             />
        //         </div>
        //     ))}
        // </div>
        <div className="w-full flex flex-row items-center justify-between gap-2 py-4 h-[560px]">
            <div className="w-2/3 flex h-full">
                <img src={linkImg + images[0]} alt="" className="object-cover w-full h-auto rounded-xl" />
            </div>

            <div className="w-1/3 h-full flex flex-col items-center gap-1">
                <div className="w-full h-1/3 flex py-1">
                    {images[1] && (<img src={images[1] ? linkImg + images[1] : ''} alt="" className="object-cover w-full  rounded-xl " />)}
                </div>
                <div className="w-full h-1/3 flex py-2">
                    {images[2] && (<img src={images[2] ? linkImg + images[2] : ''} alt="" className="object-cover w-full  rounded-xl " />)}
                </div>
                <div className="w-full h-1/3 flex py-2">
                    {images[3] && (<img src={images[3] ? linkImg + images[3] : ''} alt="" className="object-cover w-full  rounded-xl " />)}
                </div>

            </div>
        </div>
    );
};

export default ImageGrid;
