'use client'

import type { NextPage } from 'next';
import Image from "next/image";
import { useEffect, useState } from 'react';
import {
    fetchCarByFilter,
    fetchCarByFuel,
    fetchCarByLocation,
    fetchCarByPrice,
    fetchCarBySeats,
    fetchCarByTransmission,
    fetchCarByType
} from "../services/CarServices";
import { useSearchParams } from 'next/navigation';
import iconLocation from "../assets/imgs/location.svg";
import bg from "../assets/imgs/bg.jpeg";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const OPEN_CAGE_API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
const linkImg = process.env.NEXT_PUBLIC_LINK;

interface CardProps {
    activeOverlay: string | null;
    selectedBrand: string | null;
    selectedSeats: number | null;
    selectedFuel: string | null;
    selectedTransmission: string | null;
    priceRange: [number, number] | null;
}

const Card: NextPage<CardProps> = ({
    activeOverlay,
    selectedBrand,
    selectedSeats,
    selectedFuel,
    selectedTransmission,
    priceRange,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [items, setItems] = useState<any[]>([]);
    const [listLocation, setListLocation] = useState<Record<number, string>>({});

    const handleFilter = async () => {
        try {
            if (selectedBrand) {
                const response = await fetchCarByType(selectedBrand);
                setItems(response.data.content);
            } else if (selectedFuel) {
                const response = await fetchCarByFuel(selectedFuel);
                setItems(response.data.content);
            } else if (selectedSeats) {
                const response = await fetchCarBySeats(selectedSeats);
                setItems(response.data.content);
            } else if (selectedTransmission) {
                const response = await fetchCarByTransmission(selectedTransmission);
                setItems(response.data.content);
            } else if (priceRange) {
                const response = await fetchCarByPrice(priceRange[0], priceRange[1]);
                setItems(response.data.content);
            } else {
                getCar(); // Load default data
            }
        } catch (error) {
            console.error("Lỗi khi lọc dữ liệu:", error);
        }
    };

    const getCar = async () => {
        try {
            const response = await fetchCarByLocation(String(searchParams.get('location')), Number(searchParams.get('radius')));
            if (response && response.data) {
                setItems(response.data.content);

                // Lấy địa chỉ từ tọa độ
                const res = await Promise.all(
                    response.data.content.map((item: { location: { latitude: number; longitude: number; }; id: number; }) => {
                        const val = getLocation(item.location.latitude, item.location.longitude).then((post) => ({ carId: item.id, post }));
                        return val;
                    })
                );
                res.forEach(({ carId, post }) => (listLocation[carId] = post));
            }
        } catch (error) {
            console.log("Lỗi khi lấy dữ liệu xe:", error);
        }
    };

    const getLocation = async (latitude: number, longitude: number) => {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: `${latitude},${longitude}`,
                    key: OPEN_CAGE_API_KEY,
                    language: 'vi',
                    countrycode: 'VN',
                },
            });
            return response.data.results[0]?.formatted || "";
        } catch (error) {
            console.error("Lỗi khi lấy địa chỉ từ tọa độ:", error);
            return "";
        }
    };

    const srtingToLink = (images: string) => {
        const image = images.split(",");
        return linkImg + image[0];
    };

    const handleInfoCar = (id: number) => {
        router.push(`/car?carID=${id}`);
    };

    useEffect(() => {
        // getCar()
        handleFilter();
    }, [activeOverlay, selectedBrand, selectedSeats, selectedFuel, selectedTransmission, priceRange]);

    return (
        <div className="relative flex items-center justify-center bg-whitesmoke font-baloo-2 py-4">
            <div className='w-[1120px] items-center justify-center grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleInfoCar(item.id)}
                        className="cursor-pointer min-w-[255px] max-w-[500px] rounded-xl border border-smoke"
                    >
                        <div className="rounded-xl bg-white p-2 flex flex-col items-start justify-start text-left text-base text-gray">
                            <div className="w-full p-2 relative rounded-xl bg-smoke h-[155px]">
                                <Image
                                    src={item.car_detail.images ? srtingToLink(item.car_detail.images) : bg}
                                    alt=""
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="w-full flex flex-col items-start justify-start pt-3 gap-4 w-full">
                                <div className="flex flex-col items-start justify-start gap-3">
                                    <div className="relative leading-[17px] font-medium">
                                        {item.type} {item.name}
                                    </div>
                                    <div className="flex flex-row items-center justify-start gap-1.5 text-xs">
                                        <Image
                                            className="w-4 h-4"
                                            width={16}
                                            height={16}
                                            alt=""
                                            src={iconLocation}
                                        />
                                        <div className="relative leading-[17px]">
                                            <p className="text-iconcolor text-ellipsis">
                                                {listLocation[item.id]?.toString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row items-center justify-between w-full text-sm text-dimgray border-t pt-4">
                                    <div className="relative leading-[17px]">Price</div>
                                    <div className="relative leading-[17px] text-base text-gray-200">
                                        <span className="font-semibold">{item.rental_fee} VND</span>
                                        <span className="text-sm text-darkgray-100">/day</span>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-primary h-10 flex flex-row items-center justify-center p-2 gap-2 text-white mt-4">
                                    <div className="relative leading-[17px] font-medium">Rent Now</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Card;
