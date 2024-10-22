'use client';

import type { NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import eye from "../assets/imgs/eye.svg";
import eyeslash from "../assets/imgs/eye-slash.svg";

const Resetpw: NextPage = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isVisible1, setIsVisible1] = useState(true);
    const [isVisible2, setIsVisible2] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const toggleVisibility1 = () => {
        setIsVisible1(!isVisible1);
    };

    const toggleVisibility2 = () => {
        setIsVisible2(!isVisible2);
    };

    const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }

        if (newPassword === '' || confirmPassword === '') {
            setError('Vui lòng điền đầy đủ mật khẩu mới và xác nhận mật khẩu');
            return; 
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/users/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer'
                },
                body: JSON.stringify({ oldPassword: currentPassword, newPassword: newPassword }),
            });

            if (response.ok) {
                alert('Mật khẩu đã được thay đổi thành công!');
            } else {
                alert('Đổi mật khẩu thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi đổi mật khẩu');
        }
    };

    return (
        <div className="w-full relative bg-whitesmoke-100 h-[557px] text-left text-[32px] text-darkslategray-200 font-baloo-2">
            <div className="absolute top-[0px] left-[0px] bg-whitesmoke-200 w-[736px] h-[557px]">
                <div className="absolute top-[95px] left-[0px] rounded-[23px] bg-white w-[736px] h-[448px] overflow-hidden">
                    <div className="absolute top-[15px] left-[15px] w-[706px] flex flex-col items-start justify-start gap-[5px]">
                        <div className="w-[210px] relative font-medium flex items-center h-10 shrink-0">Nhập mật khẩu</div>
                        <div className="self-stretch flex flex-col items-end justify-center gap-[18px] text-base text-dimgray-100">
                            <div className="w-[706px] flex flex-col items-end justify-start">
                                <div className="w-[706px] flex flex-col items-center justify-start gap-1">
                                    <div className="self-stretch relative h-[27px]">
                                        <label className="absolute top-[0px] left-[0px] text-dimgray">Mật khẩu hiện tại</label>
                                        <div onClick={toggleVisibility} className="cursor-pointer absolute top-[0px] right-[8.86px] w-[73px] h-[29px] text-right text-lg text-dimgray-200">
                                            <Image className="absolute top-[3px] right-[49px] w-6 h-6 overflow-hidden" alt="" src={isVisible ? eyeslash : eye} />
                                            <div className="absolute top-[0px] right-[0px]">{isVisible ? 'Hiện' : 'Ẩn'}</div>
                                        </div>
                                    </div>
                                    <input
                                        type={isVisible ? 'password' : 'text'}
                                        value={currentPassword}
                                        onChange={handleCurrentPasswordChange}
                                        className="self-stretch relative rounded-lg border-dimgray border-[1px] border-solid box-border h-14 px-4 text-dimgray "
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-start">
                                <div className="w-[706px] flex flex-col items-center justify-start gap-1">
                                    <div className="self-stretch relative h-[27px]">
                                        <label className="absolute top-[0px] left-[0px] text-dimgray">Mật khẩu mới</label>
                                        <div onClick={toggleVisibility1} className="cursor-pointer absolute top-[0px] right-[8.86px] w-[73px] h-[29px] text-right text-lg text-dimgray-200">
                                            <Image className="absolute top-[3px] right-[49px] w-6 h-6 overflow-hidden" alt="" src={isVisible1 ? eyeslash : eye} />
                                            <div className="absolute top-[0px] right-[0px]">{isVisible1 ? 'Hiện' : 'Ẩn'}</div>
                                        </div>
                                    </div>
                                    <input
                                        type={isVisible1 ? 'password' : 'text'}
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                        className="self-stretch relative rounded-lg border-dimgray border-[1px] border-solid box-border h-14 px-4 text-dimgray "
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-start">
                                <div className="w-[706px] flex flex-col items-center justify-start gap-1">
                                    <div className="self-stretch relative h-[27px]">
                                        <label className="absolute top-[0px] left-[0px] text-dimgray">Nhập lại mật khẩu mới</label>
                                        <div onClick={toggleVisibility2} className="cursor-pointer absolute top-[0px] right-[8.86px] w-[73px] h-[29px] text-right text-lg text-dimgray-200">
                                            <Image className="absolute top-[3px] right-[49px] w-6 h-6 overflow-hidden" alt="" src={isVisible2 ? eyeslash : eye} />
                                            <div className="absolute top-[0px] right-[0px]">{isVisible2 ? 'Hiện' : 'Ẩn'}</div>
                                        </div>
                                    </div>
                                    <input
                                        type={isVisible2 ? 'password' : 'text'}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        className="self-stretch relative rounded-lg border-dimgray border-[1px] border-solid box-border h-14 px-4 text-dimgray "
                                    />
                                </div>
                            </div>
                            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                            <div className="flex flex-col items-end justify-start text-center text-white">
                                <button
                                    onClick={handleSubmit}
                                    className="w-[220px] rounded-lg bg-primary flex flex-row items-center justify-center py-4 px-8 box-border hover:bg-blue-600 transition-all"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-[0px] left-[0px] w-[736px] h-[109px] flex flex-col items-start justify-start text-[47px] text-darkslategray-100">
                    <div className="self-stretch relative leading-[150%] font-medium flex items-center h-[49px] shrink-0">Đổi mật khẩu</div>
                    <div className="self-stretch relative text-[16px] leading-[150%] text-black flex items-center h-[34px] shrink-0">Vui lòng nhập mật khẩu của bạn để thay đổi mật khẩu</div>
                </div>
            </div>
        </div>
    );
};

export default Resetpw;
