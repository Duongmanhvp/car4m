"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

type SelectedDate = {
    pickUp: Date | null; // Ngày nhận xe
    dropOff: Date | null; // Ngày trả xe
};

type DatePickerFrameProps = {
    pickUp: Date | null; // Ngày nhận xe (dữ liệu từ cha)
    dropOff: Date | null; // Ngày trả xe (dữ liệu từ cha)
    onDateChange: (newDates: SelectedDate) => void; // Callback gửi dữ liệu lên cha
    isOpenDatePicker: () => void
};

const DatePickerFrame: React.FC<DatePickerFrameProps> = ({
    pickUp,
    dropOff,
    onDateChange,
    isOpenDatePicker
}) => {
    const currentDate = new Date();
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(currentDate.getMonth() + 1);
    const [hourlyDate, setHourlyDate] = useState<Date | null>(null);
    const [isHourly, setIsHourly] = useState(false);  // Thêm trạng thái cho chế độ thuê theo giờ

    const handleChangeMode = () => {
        setIsHourly(!isHourly);  // Chuyển đổi giữa Thuê theo giờ và Thuê theo ngày
    };

    const handleOpen = () => {
        isOpenDatePicker()
    }

    const handleDateClick = (day: number, month: number, year: number) => {
        const clickedDate = new Date(year, month, day);

        // Set default times for pickup and dropoff
        const defaultPickUpTime = new Date(clickedDate);
        defaultPickUpTime.setHours(5, 0); // 9:00 AM by default

        const defaultDropOffTime = new Date(clickedDate);
        defaultDropOffTime.setHours(23, 0); // 5:00 PM by default

        // Logic for setting pickUp and dropOff
        let newDates: SelectedDate;
        if (!pickUp || dropOff) {
            newDates = { pickUp: defaultPickUpTime, dropOff: null };
        } else if (clickedDate > pickUp) {
            newDates = { pickUp, dropOff: defaultDropOffTime };
        } else {
            newDates = { pickUp: defaultPickUpTime, dropOff: defaultDropOffTime };
        }

        onDateChange(newDates); // Gửi dữ liệu lên cha
    };

    const handleTimeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "pickUp" | "dropOff"
    ) => {
        const selected = type === "pickUp" ? pickUp : dropOff;
        if (!selected) return;

        const [hours, minutes] = e.target.value.split(":").map(Number);
        const updatedDate = new Date(selected);
        updatedDate.setHours(hours, minutes);

        const newDates = {
            pickUp: type === "pickUp" ? updatedDate : pickUp,
            dropOff: type === "dropOff" ? updatedDate : dropOff,
        };

        onDateChange(newDates); // Gửi dữ liệu lên cha
    };

    const calculateDuration = () => {
        if (!pickUp || !dropOff) return 0;

        const pickUpDate = pickUp.getTime();
        const dropOffDate = dropOff.getTime();
        const diffTime = dropOffDate - pickUpDate;

        // Convert time difference from milliseconds to days and round up
        return Math.ceil(diffTime / (1000 * 3600 * 24));
    };

    const calculateHours = () => {
        if (!pickUp || !dropOff) return 0;

        const pickUpDate = pickUp.getTime();
        const dropOffDate = dropOff.getTime();
        const diffTime = dropOffDate - pickUpDate;

        // Convert time difference from milliseconds to days and round up
        return Math.ceil(diffTime / (1000 * 3600));
    };

    const renderDays = (monthDate: Date) => {
        const daysInMonth = new Date(
            monthDate.getFullYear(),
            monthDate.getMonth() + 1,
            0
        ).getDate();
        const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
        const weekStart = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

        const days: JSX.Element[] = [];
        for (let i = 1; i < weekStart; i++) {
            days.push(<div key={`empty-${i}`} className="w-full h-10"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), i);
            const isPast = dayDate < currentDate;
            const isSelected =
                (pickUp && dayDate.toDateString() === pickUp.toDateString()) ||
                (dropOff && dayDate.toDateString() === dropOff.toDateString());
            const isInRange =
                pickUp &&
                dropOff &&
                dayDate > pickUp &&
                dayDate < dropOff;

            days.push(
                <div
                    key={i}
                    className={`w-full h-10 flex items-center justify-center border ${isPast
                        ? "text-silver"
                        : isSelected
                            ? "bg-blue-500 text-white"
                            : isInRange
                                ? "bg-blue-200"
                                : "text-black hover:bg-blue-100 cursor-pointer"
                        }`}
                    onClick={() =>
                        !isPast &&
                        handleDateClick(i, monthDate.getMonth(), monthDate.getFullYear())
                    }
                >
                    {i}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 font-baloo-2">
            <div className="flex flex-col items-top justyfy-center bg-white rounded-xl top-[30px]">
                <div className="w-full border-b border-line relative">
                    <h2 className="text-xxl text-center p-3 font-medium">Thời gian</h2>
                    <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center border border-dimgray rounded-full bg-blue" onClick={isOpenDatePicker}>
                        <span className="items-center justify-center text-dimgray font-semibold text-sm">&#x2715;</span>
                    </button>
                </div>

                <div className="w-full flex flex-row items-center justify-center relative p-2 px-6 cursor-pointer">
                    <div onClick={handleChangeMode} className={`p-2 w-1/2 text-center border-b ${!isHourly ? 'border-b-[2px] border-lowblue  text-black' : 'border-line text-silver'}`}>
                        Thuê theo ngày
                    </div>
                    <div onClick={handleChangeMode} className={`p-2 w-1/2 text-center border-b ${isHourly ? 'border-b-[2px] border-lowblue text-black' : 'border-line text-silver'}`}>
                        Thuê theo giờ
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    {isHourly ? (
                        <div className="flex flex-col p-4 bg-white rounded-lg w-[700px] gap-2">
                            {/* DatePicker riêng cho thuê theo giờ */}
                            <div className="w-1/2 flex flex-col border border-silver rounded-lg p-2">
                                <label className="">Ngày thuê:</label>
                                <DatePicker
                                    selected={hourlyDate}
                                    onChange={(date) => {
                                        setHourlyDate(date);
                                        // Reset pickUp và dropOff khi thay đổi ngày
                                        onDateChange({ pickUp: date, dropOff: date });
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className="cursor-pointer text-xl font-medium"
                                    placeholderText="Chọn ngày"
                                    minDate={new Date()}
                                />
                            </div>

                            {/* Input giờ nhận xe */}
                            <div className="flex flex-row py-4 items-center justify-center gap-4">
                                <div className="w-1/2 flex flex-col border border-silver rounded-lg p-2">
                                    <label className="">Giờ nhận xe:</label>
                                    <input
                                        type="time"
                                        value={pickUp ? format(pickUp, "HH:mm") : "05:00"}
                                        onChange={(e) => handleTimeChange(e, "pickUp")}
                                        className="cursor-pointer font-medium text-xl"
                                        disabled={!hourlyDate} // Chỉ bật khi có ngày được chọn
                                    />
                                </div>

                                {/* Input giờ trả xe */}

                                <div className="w-1/2 flex flex-col border border-silver rounded-lg p-2">
                                    <label className="">Giờ trả xe:</label>
                                    <input
                                        type="time"
                                        value={dropOff ? format(dropOff, "HH:mm") : "23:00"}
                                        onChange={(e) => handleTimeChange(e, "dropOff")}
                                        className="cursor-pointer font-medium text-xl"
                                        disabled={!hourlyDate} // Chỉ bật khi có ngày được chọn
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col p-6 space-y-4 bg-white rounded-lg w-[700px]">
                            {/* Calendar Header */}
                            <div className="w-full flex flex-row items-center justify-center font-medium">
                                <h3 className="w-1/2 text-md text-center">Tháng {currentDate.getMonth() + 1}</h3>
                                <h3 className="w-1/2 text-md text-center">Tháng {nextMonthDate.getMonth() + 1}</h3>
                            </div>

                            {/* Calendar Grids */}
                            <div className="flex space-x-4">
                                {/* Tháng 11 */}
                                <div className="flex-1 border rounded-lg p-2">
                                    <div className="grid grid-cols-7 gap-1 text-center text-gray-500 font-medium">
                                        <div>T2</div>
                                        <div>T3</div>
                                        <div>T4</div>
                                        <div>T5</div>
                                        <div>T6</div>
                                        <div>T7</div>
                                        <div>CN</div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 mt-2">{renderDays(currentDate)}</div>
                                </div>

                                {/* Tháng 12 */}
                                <div className="flex-1 border rounded-lg p-2">
                                    <div className="grid grid-cols-7 gap-1 text-center text-gray-500 font-medium">
                                        <div>T2</div>
                                        <div>T3</div>
                                        <div>T4</div>
                                        <div>T5</div>
                                        <div>T6</div>
                                        <div>T7</div>
                                        <div>CN</div>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 mt-2">{renderDays(nextMonthDate)}</div>
                                </div>
                            </div>

                            {/* Selected Time Inputs */}
                            <div className="flex flex-row py-4 items-center justify-between">
                                {pickUp && (
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Giờ nhận xe:</label>
                                        <input
                                            type="time"
                                            className="border rounded px-2 py-1 text-base"
                                            value={format(pickUp, "HH:mm")}
                                            onChange={(e) => handleTimeChange(e, "pickUp")}
                                        />
                                    </div>
                                )}
                                {dropOff && (
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">Giờ trả xe:</label>
                                        <input
                                            type="time"
                                            className="border rounded px-2 py-1 text-base"
                                            value={format(dropOff, "HH:mm")}
                                            onChange={(e) => handleTimeChange(e, "dropOff")}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full flex flex-row items-center justify-between border-t border-line px-6 py-4">
                    {/* Display Duration */}
                    {pickUp && dropOff && (
                        <div className="flex flex-col gap-1 justify-start">
                            <div className="text-xl">
                                {format(pickUp, "HH:mm, dd/MM")} - {format(dropOff, "HH:mm, dd/MM")}
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                Thời gian thuê:
                                <p className="text-blue-500">
                                    {calculateHours()} giờ / {calculateDuration()} ngày
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div onClick={handleOpen} className="flex items-center bg-gray-100 rounded-md justify-end">
                        <button disabled={(!pickUp || !dropOff)} className={`px-4 py-3 text-xl font-medium rounded-md ${(!pickUp || !dropOff) ? "bg-smoke text-silver" : "bg-blue-500 text-white"}`} >
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DatePickerFrame;
