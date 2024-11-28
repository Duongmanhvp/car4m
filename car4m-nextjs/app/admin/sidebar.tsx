import React, { useState } from "react";

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-[340px] bg-gray-100 p-2 flex flex-col">
            {/* Header */}
            <h2 className="text-xxl border-b border-line mb-2"> Xin chào bạn!</h2>
            <a className="px-2 text-xl font-medium text-silver pt-4">Admin</a>
            <div className="flex items-center justify-between px-2 pt-2 pb-1">
                <span className="text-md text-gray-700">Quản lý hệ thống</span>
                <button
                    className="text-gray-600 hover:text-gray-800 pr-2"
                    onClick={() => setIsOpen(!isOpen)}
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
                                href="#"
                                className="p-2 block hover:bg-smoke rounded-lg"
                            >
                                Quản lý người dùng
                            </a>
                        </div>

                    </div>
                    <div className="pl-2">
                        <div className="border-l border-line px-2">
                            <a
                                href="#"
                                className="p-2 block hover:bg-smoke rounded-lg"
                            >
                                Quản lý xe
                            </a>
                        </div>

                    </div>
                    <div className="pl-2">
                        <div className="border-l border-line px-2">
                            <a
                                href="#"
                                className="p-2 block hover:bg-smoke rounded-lg"
                            >
                                Quản lý đơn thuê
                            </a>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
