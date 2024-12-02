'use client'

import { NextPage } from "next";
import { useState } from "react";
import Card from "./listcard";
import Header from "../home/header";
import Image from "next/image";

import iconCar from "../assets/imgs/car.svg"
import iconGlobal from "../assets/imgs/global.svg"
import iconGas from "../assets/imgs/gas-station.svg"
import iconTrans from "../assets/imgs/transmission.png"
import iconPrice from "../assets/imgs/dollar-circle.svg"

// Sample FilterOverlay Component
interface FilterOverlayProps {
    title: string;
    options: string[];
    selectedOption: string | null;
    onSelectOption: (option: string) => void;
    onClose: () => void;
}

const FilterOverlay: React.FC<FilterOverlayProps> = ({ title, options, selectedOption, onSelectOption, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-64 shadow-lg relative z-20" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-medium text-center mb-4">{title}</h2>
                <ul className="space-y-2">
                    {options.map((option) => (
                        <li
                            key={option}
                            className={`cursor-pointer text-center p-2 rounded ${selectedOption === option ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                            onClick={() => onSelectOption(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
                <button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    );
};

const Search: NextPage = () => {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number | null>(null);
    const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
    const [selectedTransmission, setSelectedTransmission] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

    const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

    const toggleOverlay = (overlay: string) => {
        setActiveOverlay(activeOverlay === overlay ? null : overlay);
    };

    return (
        <section className="main flex flex-col justify-center items-center font-baloo-2 bg-whitesmoke">
            <Header />
            <div className="w-full relative flex flex-row items-center justify-center shadow-lg border-t border-smoke bg-whitesmoke">
                {/* Selection Bar */}
                <div className="w-[1120px] relative flex flex-row items-center justify-between text-center gap-4 py-4">
                    <div className="relative flex flex-row items-center justify-between gap-4">
                        <div onClick={() => toggleOverlay("brand")} 
                            className={`cursor-pointer flex flex-row text-center items-center justify-center gap-1 px-2 py-1 rounded-lg bg-white border border-silver ${selectedBrand ? 'bg-whiteblue' : ''}`}>
                            <Image className="w-4 h-4 relative" alt="" src={iconGlobal} />

                            <p className="align-middle">
                                Hãng xe
                            </p>
                        </div>
                        <div onClick={() => toggleOverlay("seats")} 
                            className={`cursor-pointer flex flex-row text-center items-center justify-center gap-1 px-2 py-1 rounded-lg bg-white border border-silver ${selectedSeats ? 'bg-whiteblue' : ''}`}>
                            <Image className="w-4 h-4 relative" alt="" src={iconCar} />

                            <p className="align-middle">
                                Số chỗ
                            </p>
                        </div>
                        <div onClick={() => toggleOverlay("fuel")} 
                            className={`cursor-pointer flex flex-row text-center items-center justify-center gap-1 px-2 py-1 rounded-lg bg-white border border-silver ${selectedFuel ? 'bg-whiteblue' : ''}`}>
                            <Image className="w-4 h-4 relative" alt="" src={iconGas} />

                            <p className="align-middle">
                                Nhiên liệu
                            </p>
                        </div>
                        <div onClick={() => toggleOverlay("transmission")} 
                            className={`cursor-pointer flex flex-row text-center items-center justify-center gap-1 px-2 py-1 rounded-lg bg-white border border-silver ${selectedTransmission ? 'bg-whiteblue' : ''}`}>
                            <Image className="w-4 h-4 relative" alt="" src={iconTrans} />

                            <p className="align-middle">
                                Truyền Động
                            </p>
                        </div>
                        <div onClick={() => toggleOverlay("price")} 
                            className={`cursor-pointer flex flex-row text-center items-center justify-center gap-1 px-2 py-1 rounded-lg bg-white border border-silver ${priceRange[0] > 0 ? 'bg-whiteblue' : ''}`}>
                            <Image className="w-4 h-4 relative" alt="" src={iconPrice} />

                            <p className="align-middle">
                                Khoảng giá
                            </p>
                        </div>
                    </div>


                    <div className="px-2 py-1 rounded-lg bg-white border border-silver font-medium">
                        Bộ lọc
                    </div>
                </div>

                {/* Overlays */}
                {activeOverlay === "brand" && (
                    <FilterOverlay
                        title="Chọn Hãng Xe"
                        options={["", "Toyota", "Honda", "Ford", "BMW", "Vinfast", "Mazda", "Mecerdes", "Huyndai", "Chevrolet", "Suzuki", "Nissan", "Mitsubishi"]}
                        selectedOption={selectedBrand}
                        onSelectOption={setSelectedBrand}
                        onClose={() => toggleOverlay("brand")}
                    />
                )}

                {activeOverlay === "seats" && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => toggleOverlay("seats")}>
                        <div className="bg-white rounded-lg p-6 w-64 shadow-lg relative z-20" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-lg font-medium text-center mb-4 border-b border-smoke">Chọn Truyền Động</h2>
                            <ul className="space-y-2">
                                {[
                                    { value: null, label: "Tất cả" },
                                    { value: 4, label: "4 Chỗ" },
                                    { value: 5, label: "5 Chỗ" },
                                    { value: 7, label: "7 Chỗ" }
                                ].map((item) => (
                                    <li key={item.value} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="cursor-pointer"
                                            checked={selectedSeats === item.value}
                                            onChange={() => setSelectedSeats(item.value)}
                                        />
                                        <span className="cursor-pointer">{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg" onClick={() => toggleOverlay("seats")}>
                                Đóng
                            </button>
                        </div>
                    </div>
                )}

                {activeOverlay === "fuel" && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => toggleOverlay("fuel")}>
                        <div className="bg-white rounded-lg p-6 w-64 shadow-lg relative z-20" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-lg font-medium text-center mb-4 border-b border-smoke">Chọn Nhiên Liệu</h2>
                            <ul className="space-y-2">
                                {[
                                    { value: "", label: "Tất cả" },
                                    { value: "ELECTRICITY", label: "Điện" },
                                    { value: "GASOLINE", label: "Xăng" },
                                    { value: "OIL", label: "Dầu" },
                                ].map((item) => (
                                    <li key={item.value} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="cursor-pointer"
                                            checked={selectedFuel === item.value}
                                            onChange={() => setSelectedFuel(item.value)}
                                        />
                                        <span className="cursor-pointer">{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg" onClick={() => toggleOverlay("fuel")}>
                                Đóng
                            </button>
                        </div>
                    </div>
                )}

                {activeOverlay === "transmission" && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => toggleOverlay("transmission")}>
                        <div className="bg-white rounded-lg p-6 w-64 shadow-lg relative z-20" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-lg font-medium text-center mb-4 border-b border-smoke">Chọn Truyền Động</h2>
                            <ul className="space-y-2">
                                {[
                                    { value: "", label: "Tất cả" },
                                    { value: "AT", label: "Số tự động" },
                                    { value: "MT", label: "Số sàn" }
                                ].map((item) => (
                                    <li key={item.value} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="cursor-pointer"
                                            checked={selectedTransmission === item.value}
                                            onChange={() => setSelectedTransmission(item.value)}
                                        />
                                        <span className="cursor-pointer">{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg" onClick={() => toggleOverlay("transmission")}>
                                Đóng
                            </button>
                        </div>
                    </div>
                )}

                {activeOverlay === "price" && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => toggleOverlay("price")}>
                        <div className="bg-white rounded-lg p-6 w-64 shadow-lg relative z-20" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-lg font-medium text-center mb-4 border-b border-smoke">Chọn Khoảng Giá</h2>
                            <div className="flex flex-col space-y-4">
                                <label>
                                    Giá tối thiểu: <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])} className="border rounded w-full p-1" />
                                </label>
                                <label>
                                    Giá tối đa: <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} className="border rounded w-full p-1" />
                                </label>
                            </div>
                            <button className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-lg" onClick={() => toggleOverlay("price")}>
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full flex items-center justify-center pt-8">
                <Card
                    activeOverlay={activeOverlay}
                    selectedBrand={selectedBrand}
                    selectedSeats={selectedSeats}
                    selectedFuel={selectedFuel}
                    selectedTransmission={selectedTransmission}
                    priceRange={priceRange ? [priceRange[0],priceRange[1]] : null}
                />
            </div>
        </section>
    );
};

export default Search;
