'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

import location from "../assets/imgs/location.svg"

interface LocationModalProps {
    onLocationSelect: (location: string) => void; // Định nghĩa props để nhận hàm từ cha
    onToggleLocationFrame: () => void;
}

const LocationSelect: React.FC<LocationModalProps> = ({ onLocationSelect, onToggleLocationFrame }) => {

    const handleSelect = (location: string) => {
        onLocationSelect(location); // Gọi hàm truyền từ cha để cập nhật location
    };

    const toggleFrame = () => {
        onToggleLocationFrame()
    }

    const [currentLocation, setCurrentLocation] = useState<string>('')
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const OPEN_CAGE_API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

    useEffect(() => {
        if (query.length > 2) {
            setLoading(true);
            fetchSuggestions(query);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const fetchSuggestions = async (input: string) => {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: input,
                    key: OPEN_CAGE_API_KEY,
                    language: 'vi',
                    countrycode: 'VN',
                },
            });

            const suggestions = response.data.results.map((result: any) => result.formatted);
            setSuggestions(suggestions);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi gọi OpenCage API:", error);
            setSuggestions([]);
            setLoading(false);
        }
    };

    const fetchCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                        params: {
                            q: `${latitude},${longitude}`,
                            key: OPEN_CAGE_API_KEY,
                            language: 'vi',
                            countrycode: 'VN',
                        },
                    });

                    const location = response.data.results[0].formatted;
                    setCurrentLocation(location)
                    setQuery(location)
                } catch (error) {
                    console.error("Lỗi khi lấy địa chỉ từ tọa độ:", error);
                }
            }, (error) => {
                console.error("Lỗi khi lấy vị trí hiện tại:", error);
            });
        } else {
            console.error("Trình duyệt không hỗ trợ Geolocation");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSelectSuggestion = (suggestion: string) => {
        setQuery(suggestion);
        setSuggestions([]); // Xóa gợi ý ngay khi chọn
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 font-baloo-2">
            <div className="top-[-200px] bg-white rounded-lg p-6 shadow-lg relative z-20 flex-col items-center justify-center">
                <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center border border-dimgray rounded-full" onClick={toggleFrame}>
                    <span className="items-center justify-center text-dimgray font-semibold text-sm">&#x2715;</span>
                </button>
                <h1 className="text-xxl font-medium text-center mb-4">Địa điểm</h1>
                <div>
                    <div className="relative w-[600px] ">
                        {/* Ô nhập địa chỉ */}
                        <div className="flex items-center justify-flex w-full p-1 border-2 border-silver rounded">
                            <Image className="w-7 h-7 pr-1" alt="" src={location} />
                            <input
                                type="text"
                                value={query}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ của bạn"
                                className="w-full p-1 focus:outline-none focus:border-transparent"
                            />
                        </div>
                        {/* Hiển thị gợi ý */}
                        {loading && <p className="text-sm text-gray-500 mt-1">Đang tải...</p>}

                        {suggestions.length > 0 && (
                            <ul className="absolute w-full bg-white border border-gray-300 rounded shadow-lg mt-1 z-10 max-h-40 overflow-y-auto">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSelectSuggestion(suggestion)}
                                        className="p-2 cursor-pointer hover:bg-smoke"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div onClick={fetchCurrentLocation} className="text-lg p-1 flex items-center cursor-pointer mt-5 hover hover:bg-smoke">
                        <Image className="w-7 h-7 pr-1" alt="" src={location} />
                        {currentLocation ? currentLocation : 'Vị trí hiện tại'}
                    </div>
                </div>
                <div onClick={toggleFrame} className='flex items-center justify-center cursor-pointer'>
                    <a className="w-[200px] flex mt-4 items-center justify-center px-4 py-2 bg-primary text-white rounded" onClick={() => handleSelect(query)}>
                        Xác nhận
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LocationSelect;

