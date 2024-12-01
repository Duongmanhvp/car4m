"use client"

import React, { useEffect, useState } from "react"
import { format } from "date-fns"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { getAllCarOrder } from "../services/OrderService"

type SelectedDate = {
    pickUp: Date | null // Ngày nhận xe
    dropOff: Date | null // Ngày trả xe
}

type Order = {
    receive_date: Date
    return_date: Date
}

type DatePickerFrameProps = {
    carId: number
    pickUp: Date | null // Ngày nhận xe (dữ liệu từ cha)
    dropOff: Date | null // Ngày trả xe (dữ liệu từ cha)
    onDateChange: (newDates: SelectedDate) => void // Callback gửi dữ liệu lên cha
    isOpenDatePicker: () => void
}

const DatePickerFrame: React.FC<DatePickerFrameProps> = ({
    carId,
    pickUp,
    dropOff,
    onDateChange,
    isOpenDatePicker
}) => {
    const [order, setOrder] = useState<Order[]>([])
    const currentDate = new Date()
    const nextMonthDate = new Date(currentDate)
    nextMonthDate.setMonth(currentDate.getMonth() + 1)
    //currentDate.setDate(currentDate.getDate() - 1)
    const [hourlyDate, setHourlyDate] = useState<Date | null>(null)
    const [isHourly, setIsHourly] = useState(false)  // Thêm trạng thái cho chế độ thuê theo giờ

    const handleChangeMode = () => {
        setIsHourly(!isHourly)  // Chuyển đổi giữa Thuê theo giờ và Thuê theo ngày
    }

    const handleOpen = () => {
        isOpenDatePicker()
    }

    const getAllOrder = async () => {
        try {
            const respone = await getAllCarOrder(carId)
            setOrder(respone.data)
        } catch (error) {
            console.log('Loi khi lay du lieu rental', error)
        }
    }

    const handleDateClick = (day: number, month: number, year: number) => {
        const clickedDate = new Date(year, month, day)

        // Set default times for pickup and dropoff
        const defaultPickUpTime = new Date(clickedDate)
        defaultPickUpTime.setHours(5, 0) // 9:00 AM by default

        const defaultDropOffTime = new Date(clickedDate)
        defaultDropOffTime.setHours(23, 0) // 5:00 PM by default

        // Logic for setting pickUp and dropOff
        let newDates: SelectedDate
        if (!pickUp || dropOff) {
            newDates = { pickUp: defaultPickUpTime, dropOff: null }
        } else if (clickedDate > pickUp) {
            newDates = { pickUp, dropOff: defaultDropOffTime }
        } else {
            newDates = { pickUp: defaultPickUpTime, dropOff: defaultDropOffTime }
        }

        onDateChange(newDates) // Gửi dữ liệu lên cha
    }

    const handleTimeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "pickUp" | "dropOff"
    ) => {
        const selected = type === "pickUp" ? pickUp : dropOff
        if (!selected) return

        const [hours, minutes] = e.target.value.split(":").map(Number)
        const updatedDate = new Date(selected)
        updatedDate.setHours(hours, minutes)

        const newDates = {
            pickUp: type === "pickUp" ? updatedDate : pickUp,
            dropOff: type === "dropOff" ? updatedDate : dropOff,
        }

        onDateChange(newDates) // Gửi dữ liệu lên cha
    }

    const handleTimeChange1 = (time: string) => {
        const [hour, minute] = time.split(":").map(Number);
        const updatedDate = new Date(hourlyDate!);
        updatedDate.setHours(hour, minute);

        let newDates: SelectedDate
        if (!pickUp || dropOff) {
            newDates = { pickUp: updatedDate, dropOff: null }
        } else if (updatedDate > pickUp) {
            newDates = { pickUp, dropOff: updatedDate }
        } else {
            newDates = { pickUp: updatedDate, dropOff: updatedDate }
        }

        onDateChange(newDates)
    };

    const calculateDuration = () => {
        if (!pickUp || !dropOff) return 0

        const pickUpDate = pickUp.getTime()
        const dropOffDate = dropOff.getTime()
        const diffTime = dropOffDate - pickUpDate

        // Convert time difference from milliseconds to days and round up
        return Math.ceil(diffTime / (1000 * 3600 * 24))
    }

    const calculateHours = () => {
        if (!pickUp || !dropOff) return 0

        const pickUpDate = pickUp.getTime()
        const dropOffDate = dropOff.getTime()
        const diffTime = dropOffDate - pickUpDate

        // Convert time difference from milliseconds to days and round up
        return Math.ceil(diffTime / (1000 * 3600))
    }

    const isDateDisabled = (date: Date) => {
        return order.some((range) => {
            //console.log(date.getDate() ,  (range.receive_date) ,  (range.return_date), (date.getDate() >= new Date(range.receive_date).getDate() && date.getDate() <= new Date(range.return_date).getDate()))
            if (range.receive_date && range.return_date) {
                return (format(date, "yyyy-MM-dd") >= format(range.receive_date, "yyyy-MM-dd") && format(date, "yyyy-MM-dd") <= format(range.return_date, "yyyy-MM-dd"))
            }
            return false
        })
    }

    const generateHourlySlots = (orders: any[], date: Date | null): { time: string; disabled: boolean }[] => {
        if (!date) return [];

        // Tạo danh sách 24 giờ từ 00:00 đến 23:00
        const slots = Array.from({ length: 24 }, (_, i) => {
            const time = i.toString().padStart(2, "0") + ":00";
            return { time, disabled: false };
        });

        let start = 0
        let end = -1

        // Lọc các khoảng giờ đã đặt trong ngày
        orders.filter((o) => {
            if (format(date, "yyyy-MM-dd") == format(o.receive_date, "yyyy-MM-dd")) start = new Date(o.receive_date).getHours()
            if (format(date, "yyyy-MM-dd") == format(o.return_date, "yyyy-MM-dd")) end = new Date(o.return_date).getHours()
            if (new Date(o.receive_date) <= date && date <= new Date(o.return_date)) end = 23

            console.log(o, date, (new Date(o.receive_date) <= date && date <= new Date(o.return_date)))
        })

        console.log(start, end)

        // Đánh dấu giờ bị trùng
        for (let i = start; i <= end; i++) {
            const time = i.toString().padStart(2, "0") + ":00";
            const slot = slots.find((s) => s.time === time);
            if (slot) slot.disabled = true;
        }


        return slots;
    };

    // const generateHourlySlots = (
    //     orders: any[],
    //     date: Date | null,
    //     pickUpTime: Date | null
    // ): { time: string; disabled: boolean }[] => {
    //     if (!date) return [];

    //     // Tạo danh sách 24 giờ
    //     const slots = Array.from({ length: 24 }, (_, i) => {
    //         const time = i.toString().padStart(2, "0") + ":00";
    //         return { time, disabled: false };
    //     });

    //     let start = 0
    //     let end = -1

    //     // Lọc các khoảng giờ đã đặt trong ngày
    //     orders.filter((o) => {
    //         if (format(date, "yyyy-MM-dd") == format(o.receive_date, "yyyy-MM-dd")) start = new Date(o.receive_date).getHours()
    //         if (format(date, "yyyy-MM-dd") == format(o.return_date, "yyyy-MM-dd")) end = new Date(o.return_date).getHours()
    //         if (new Date(o.receive_date) <= date && date <= new Date(o.return_date)) end = 23

    //         console.log(o, date, (new Date(o.receive_date) <= date && date <= new Date(o.return_date)))
    //     })

    //     console.log(start, end)

    //     // Đánh dấu giờ bị trùng
    //     for (let i = start; i <= end; i++) {
    //         const time = i.toString().padStart(2, "0") + ":00";
    //         const slot = slots.find((s) => s.time === time);
    //         if (slot) slot.disabled = true;
    //     }

    //     // Logic thêm: nếu đã chọn pickUpTime, chỉ hiển thị giờ sau đó cho dropOff
    //     if (pickUpTime) {
    //         const pickUpHour = pickUpTime.getHours();
    //         slots.forEach((slot) => {
    //             const slotHour = parseInt(slot.time.split(":")[0], 10);
    //             if (slotHour <= pickUpHour) slot.disabled = true;
    //         });
    //     }

    //     return slots;
    // };

    const renderDays = (monthDate: Date) => {
        const daysInMonth = new Date(
            monthDate.getFullYear(),
            monthDate.getMonth() + 1,
            0
        ).getDate()
        const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
        const weekStart = firstDay.getDay() === 0 ? 7 : firstDay.getDay()

        const days: JSX.Element[] = []
        for (let i = 1; i < weekStart; i++) {
            days.push(<div key={`empty-${i}`} className="w-full h-10"></div>)
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), i, 23)
            const isPast = dayDate < currentDate
            const isSelected =
                (pickUp && dayDate.toDateString() === pickUp.toDateString()) ||
                (dropOff && dayDate.toDateString() === dropOff.toDateString())
            const isInRange =
                pickUp &&
                dropOff &&
                dayDate > pickUp &&
                dayDate < dropOff

            days.push(
                <div
                    key={i}
                    className={`w-full h-10 flex items-center justify-center border 
                          ${isPast
                            ? "text-silver"
                            : isDateDisabled(dayDate)
                                ? "text-silver" // Disable những ngày trùng
                                : isSelected
                                    ? "bg-blue-500 text-white"
                                    : isInRange
                                        ? "bg-blue-200"
                                        : "text-black hover:bg-blue-100 cursor-pointer"
                        }`}
                    onClick={() =>
                        !isPast &&
                        !isDateDisabled(dayDate) && // Chặn không cho click vào ngày bị disable
                        handleDateClick(i, monthDate.getMonth(), monthDate.getFullYear())
                    }
                >
                    {i}
                </div>
            )

        }
        return days
    }

    const isInRange = (time: string): boolean => {
        if (!pickUp || !dropOff) return false;
    
        const pickupHour = pickUp.getHours()
        const dropoffHour = dropOff.getHours()
        const currentHour = parseInt(time.split(":")[0], 10);
    
        return pickupHour < currentHour && currentHour < dropoffHour;
    };
    

    const renderSlots = (slots: { time: string; disabled: boolean }[]) => {
        return (
            <div className="grid grid-cols-6 gap-2">
                {slots.map((slot) => {
                    const { time, disabled } = slot;
                    const isSelected =
                        time === pickUp?.getHours().toString().padStart(2, "0") + ":00" || time === dropOff?.getHours().toString().padStart(2, "0") + ":00"
                    const inRange = isInRange(time);
    
                    return (
                        <div
                            key={time}
                            className={`w-full h-10 flex items-center justify-center border rounded-md 
                                ${
                                    disabled
                                        ? "text-silver cursor-not-allowed"
                                        : isSelected
                                        ? "bg-blue-500 text-white"
                                        : inRange
                                        ? "bg-blue-200"
                                        : "text-black hover:bg-blue-100 cursor-pointer"
                                }`}
                            onClick={() => handleTimeChange1(time)}
                        >
                            {time}
                        </div>
                    );
                })}
            </div>
        );
    };
    

    useEffect(() => {
        getAllOrder()
    }, [])

    //console.log(isDateDisabled(currentDate))

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 font-baloo-2">
            <div className="flex flex-col items-top justyfy-center bg-white rounded-xl top-[30px]">
                <div className="w-full border-b border-line relative">
                    <h2 className="text-xxl text-center p-3 font-medium">Thời gian</h2>
                    <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center border border-dimgray rounded-full bg-blue" onClick={isOpenDatePicker}>
                        <span className="items-center justify-center text-dimgray font-semibold text-sm">x</span>
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
                                        setHourlyDate(date)
                                        // Reset pickUp và dropOff khi thay đổi ngày
                                        //onDateChange({ pickUp: date, dropOff: date })
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className="cursor-pointer text-xl font-medium"
                                    placeholderText="Chọn ngày"
                                    minDate={new Date()}
                                />
                            </div>
                            
                            {hourlyDate && renderSlots(generateHourlySlots(order, hourlyDate))}
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
    )
}

export default DatePickerFrame
