"use client";

import React, { useState } from "react";
import { format } from "date-fns";

type SelectedDate = {
    pickUp: Date | null; // Ngày nhận xe
    dropOff: Date | null; // Ngày trả xe
};

const DatePickerFrame: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<SelectedDate>({
        pickUp: null,
        dropOff: null,
    });

    const currentDate = new Date();
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(currentDate.getMonth() + 1);

    const handleDateClick = (day: number, month: number, year: number) => {
        const clickedDate = new Date(year, month, day);

        // Set default times for pickup and dropoff
        const defaultPickUpTime = new Date(clickedDate);
        defaultPickUpTime.setHours(9, 0); // 9:00 AM by default

        const defaultDropOffTime = new Date(clickedDate);
        defaultDropOffTime.setHours(17, 0); // 5:00 PM by default

        // Logic for setting pickUp and dropOff
        if (!selectedDate.pickUp || selectedDate.dropOff) {
            setSelectedDate({ pickUp: defaultPickUpTime, dropOff: null });
        } else if (clickedDate > selectedDate.pickUp) {
            setSelectedDate({ pickUp: selectedDate.pickUp, dropOff: defaultDropOffTime });
        } else {
            setSelectedDate({ pickUp: defaultPickUpTime, dropOff: null });
        }
    };

    const handleTimeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "pickUp" | "dropOff"
    ) => {
        const selected = selectedDate[type];
        if (!selected) return;

        const [hours, minutes] = e.target.value.split(":").map(Number);
        const updatedDate = new Date(selected);
        updatedDate.setHours(hours, minutes);

        setSelectedDate((prev) => ({
            ...prev,
            [type]: updatedDate,
        }));
    };

    const calculateDuration = () => {
        if (!selectedDate.pickUp || !selectedDate.dropOff) return 0;

        const pickUpDate = selectedDate.pickUp.getTime();
        const dropOffDate = selectedDate.dropOff.getTime();
        const diffTime = dropOffDate - pickUpDate;

        // Convert time difference from milliseconds to days and round up
        return Math.ceil(diffTime / (1000 * 3600 * 24));
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
                (selectedDate.pickUp &&
                    dayDate.toDateString() === selectedDate.pickUp.toDateString()) ||
                (selectedDate.dropOff &&
                    dayDate.toDateString() === selectedDate.dropOff.toDateString());
            const isInRange =
                selectedDate.pickUp &&
                selectedDate.dropOff &&
                dayDate > selectedDate.pickUp &&
                dayDate < selectedDate.dropOff;

            days.push(
                <div
                    key={i}
                    className={`w-full h-10 flex items-center justify-center border ${isPast
                        ? "text-gray-400"
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
            <div className="flex flex-col p-6 space-y-4 bg-white shadow-lg rounded-lg w-[700px]">
                {/* Calendar Header */}
                <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-semibold">Tháng 11</h3>
                    <h3 className="text-lg font-semibold">Tháng 12</h3>
                </div>

                {/* Calendar Grids */}
                <div className="flex space-x-4">
                    {/* Tháng 11 */}
                    <div className="flex-1 border rounded-lg p-2">
                        <div className="grid grid-cols-7 gap-1 text-center text-gray-500 font-semibold">
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
                        <div className="grid grid-cols-7 gap-1 text-center text-gray-500 font-semibold">
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
                    {selectedDate.pickUp && (
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Giờ nhận xe:
                            </label>
                            <input
                                type="time"
                                className="border rounded px-2 py-1 text-sm"
                                value={format(selectedDate.pickUp, "HH:mm")}
                                onChange={(e) => handleTimeChange(e, "pickUp")}
                            />
                        </div>
                    )}
                    {selectedDate.dropOff && (
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Giờ trả xe:
                            </label>
                            <input
                                type="time"
                                className="border rounded px-2 py-1 text-sm"
                                value={format(selectedDate.dropOff, "HH:mm")}
                                onChange={(e) => handleTimeChange(e, "dropOff")}
                            />
                        </div>
                    )}
                </div>

                {/* Display Duration */}
                {selectedDate.pickUp && selectedDate.dropOff && (
                    <div className="mt-4">
                        <p className="text-sm font-semibold">
                            Thời gian thuê: {calculateDuration()} ngày
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">
                        Tiếp tục
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DatePickerFrame;
