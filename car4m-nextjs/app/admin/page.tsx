'use client'
import type { NextPage } from 'next'
import Image from 'next/image'
import Header from '../home/header'
import Sidebar from './sidebar'
import { useState } from 'react'
import AcceptCar from './car'

const Admin: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState(''); // Quản lý trạng thái phần hiện tại
    // Nội dung các frame khác nhau
    const renderSectionContent = () => {
        switch (activeSection) {
            case 'car':
                return <AcceptCar />
            case 'order':
                return <div>Danh sách xe yêu thích của bạn...</div>;
            case 'user':
                return <></>
            default:
                return <div className='flex items-center justify-center text-xxl pt-1'>Quản lý hệ thống Car4m</div>
        }
    }

    return (
        <section>
            <Header />
            <div className="w-full h-[850px] flex flex-col items-center justify-start bg-whitesmoke font-baloo-2">
                <div className='w-[1120px] pt-[80px] flex flex-row items-start justify-between rounded'>
                    <div className="w-[350px] bg-gray-100 p-2 flex flex-col">
                        {/* Header */}
                        <h2 className="text-xxl border-b border-line mb-2"> Xin chào bạn!</h2>
                        <a className="px-2 text-xl font-medium text-silver pt-4">Admin</a>
                        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex items-center justify-between px-2 pt-2 pb-1 hover:bg-smoke rounded-lg">
                            <span className="text-md text-gray-700">Quản lý hệ thống</span>
                            <button
                                className="text-gray-600 hover:text-gray-800 pr-2"
                                
                            >
                                {isOpen ? "▾" : "▸"}
                            </button>
                        </div>

                        {/* Menu */}
                        {isOpen && (
                            <div className="px-2">
                                <div className="pl-2">
                                    <div className="border-l border-line px-2">
                                        <a
                                            onClick={() => setActiveSection('user')}
                                            className="p-2 block hover:bg-smoke rounded-lg cursor-pointer"
                                        >
                                            Quản lý người dùng
                                        </a>
                                    </div>

                                </div>
                                <div className="pl-2">
                                    <div className="border-l border-line px-2">
                                        <a
                                            onClick={() => setActiveSection('car')}
                                            className="p-2 block hover:bg-smoke rounded-lg cursor-pointer"
                                        >
                                            Quản lý xe
                                        </a>
                                    </div>

                                </div>
                                <div className="pl-2">
                                    <div className="border-l border-line px-2">
                                        <a
                                            onClick={() => setActiveSection('order')}
                                            className="p-2 block hover:bg-smoke rounded-lg cursor-pointer"
                                        >
                                            Quản lý đơn thuê
                                        </a>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>

                    <div className='pl-4 pt-2 flex flex-col items-center w-[750px]'>
                        {renderSectionContent()}
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </section>
    )
}

export default Admin
