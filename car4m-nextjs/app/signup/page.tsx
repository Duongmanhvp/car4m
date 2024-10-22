'use client'

import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import eye from "../assets/imgs/eye.svg"
import eyeslash from "../assets/imgs/eye-slash.svg"



const Frame: NextPage = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [isVisible1, setIsVisible1] = useState(true);
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const toggleVisibility1 = () => {
        setIsVisible1(!isVisible1);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, phone: phone, username: name, password: password }),
            });

            if (response.ok) {
                const data = await response.json();
                
                let src = `/home?user=${data.data.id}`
                // window.location.href = src
                console.log(data);
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Đăng ky thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi đăng ky');
        }
    }


    return (
        <div className="w-full relative h-[1024px] overflow-hidden text-left text-base text-dimgray-100 font-baloo-2">
            <div className="absolute left-[150px] h-[854px] flex flex-col items-start justify-end gap-8">
                <div className="flex flex-col items-start justify-start text-[32px] text-darkslategray">
                    <div className="relative font-medium">Chào mừng đến với Car4m</div>
                </div>
                <div className="w-[665px] flex flex-col items-start justify-start gap-1">
                    <div className="self-stretch relative h-[27px]">
                        <div className="absolute top-[0px] left-[0px]">Email</div>
                    </div>
                    <input
                        type='email'
                        onChange={handleEmailChange}
                        value={email}
                        className="p-2.5 self-stretch relative rounded-xl border-dimgray border-[1px] border-solid box-border h-14 overflow-hidden shrink-0"
                        placeholder='Email'
                    />
                </div>
                <div className="w-[665px] flex flex-col items-start justify-start gap-1">
                    <div className="self-stretch relative h-[27px]">
                        <div className="absolute top-[0px] left-[0px]">Số điện thoại</div>
                    </div>
                    <input
                        type='text'
                        onChange={handlePhoneChange}
                        value={phone}
                        className="p-2.5 self-stretch relative rounded-xl border-dimgray border-[1px] border-solid box-border h-14 overflow-hidden shrink-0"
                        placeholder='Số điện thoại'
                    />
                </div>
                <div className="w-[665px] flex flex-col items-start justify-start gap-1">
                    <div className="self-stretch relative h-[27px]">
                        <div className="absolute top-[0px] left-[0px]">Tên đăng nhập</div>
                    </div>
                    <input
                        type='text'
                        placeholder='Nhập tên đăng nhập'
                        value={name}
                        onChange={handleUsernameChange}
                        className="p-2.5 self-stretch relative rounded-xl border-dimgray border-[1px] border-solid box-border h-14 overflow-hidden shrink-0" />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <div className="w-[665px] flex flex-col items-start justify-start gap-1">
                        <div className="self-stretch relative h-[27px]">
                            <div className="absolute top-[0px] left-[0px]">Mật khẩu</div>
                            <div onClick={toggleVisibility} className="absolute top-[0px] right-[8.86px] w-[73px] h-[27px] text-right text-lg text-dimgray-200">
                                <Image className="absolute top-[3px] right-[49px] w-6 h-6 overflow-hidden" alt="" src={isVisible ? eyeslash : eye} />
                                <div className="absolute top-[0px] right-[0px]"> {isVisible ? 'Hiện' : 'Ẩn'} </div>
                            </div>
                        </div>
                        <input
                            type={isVisible ? 'password' : 'text'}
                            placeholder='Nhập mật khẩu'
                            value={password}
                            onChange={handlePasswordChange}
                            className="p-2.5 self-stretch relative rounded-xl border-dimgray border-[1px] border-solid box-border h-14 overflow-hidden shrink-0" />
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start">
                    <div className="w-[665px] flex flex-col items-start justify-start gap-1">
                        <div className="self-stretch relative h-[27px]">
                            <div className="absolute top-[0px] left-[0px]">Nhập lại mật khẩu</div>
                            <div onClick={toggleVisibility1} className="absolute top-[0px] right-[8.86px] w-[73px] h-[27px] text-right text-lg text-dimgray-200">
                                <Image className="absolute top-[3px] right-[49px] w-6 h-6 overflow-hidden" alt="" src={isVisible1 ? eyeslash : eye} />
                                <div className="absolute top-[0px] right-[0px]">{isVisible1 ? 'Hiện' : 'Ẩn'}</div>
                            </div>
                        </div>
                        <input
                            type={isVisible1 ? 'password' : 'text'}
                            placeholder='Nhập lại mật khẩu'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="p-2.5 self-stretch relative rounded-xl border-dimgray border-[1px] border-solid box-border h-14 overflow-hidden shrink-0" />
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-2 text-center text-white font-baloo-2">
                    <button onClick={handleSignUp} className="w-[220px] rounded-lg bg-primary flex flex-row items-center justify-center py-4 px-8 box-border">
                        Đăng ký
                    </button>
                    <div className="flex flex-row items-start justify-start p-0.5 text-left text-gray font-poppins">
                        <div className="relative">
                            <span className="text-darkslategray">Bạn đã có tài khoản?</span>
                            <span className="text-dimgray-100">{` `}</span>
                            <span className="[text-decoration:underline] whitespace-pre-wrap">
                                <Link legacyBehavior href="/signin">
                                    <a className="btn-primary">Đăng nhập</a>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-[0px] left-[843px] bg-white w-[597px] h-[1024px] overflow-hidden">
                <img className="absolute top-[0px] left-[0px] w-[597px] h-[1024px] object-cover hidden" alt="" src="Rectangle.png" />
                <img className="absolute top-[-14px] left-[-65px] w-[690px] h-[1051px] object-cover" alt="" src="sebastian-svenson-d2w-_1LJioQ-unsplash 1.png" />
            </div>
        </div>);
};

export default Frame;
