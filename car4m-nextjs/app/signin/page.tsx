'use client'

import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import eye from "../assets/imgs/eye.svg"
import eyeslash from "../assets/imgs/eye-slash.svg"
import axios from "axios"
import jwt, { JwtPayload } from 'jsonwebtoken'


const  Frame: NextPage = () => {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(true);
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); 
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auths/`, {
            username: name,
            password: password
        })
            .then((response) => {
                if (response != null) {
                    const data = response.data;
                    localStorage.setItem('access_token', data.data.access_token);
                    localStorage.setItem('refresh_token', data.data.refresh_token);

                    const decode = jwt.decode(data.data.access_token) as JwtPayload
                    if (decode.scope == 'ROLE_ADMIN')
                        router.push('/admin')
                    else 
                        router.push('/home')
                    
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Đã xảy ra lỗi khi đăng nhap');
              });
    };   

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleLogin
        }
      };

    return (
        <div className="w-full flex bg-white h-[1024px] overflow-hidden text-center text-[56px] text-white font-baloo-2">
            <div className="absolute top-[0px] w-full h-[1024px] overflow-hidden">
                <img className="absolute top-[0px] left-[0px] w-[920px] h-[1024px] object-cover" alt="" src="bert-b-rhNff6hB41s-unsplash 1.png" />
                <div className="absolute top-[182px] left-[72px] flex flex-col items-start justify-center gap-4">
                    <div className="relative leading-[64px] font-semibold">CAR4M</div>
                    <div className="w-[482px] relative text-[24px] text-left flex items-center">Trang web thuê xe nhanh chóng, tiện lợi và dễ dàng</div>
                </div>
                <div className="absolute top-[0px] left-[920px] w-[720px] h-[1024px] overflow-hidden text-left text-[32px] text-darkslategray">
                    <div className="absolute top-[179px] left-[76px] flex flex-col items-start justify-start gap-12">
                        <div className="relative font-medium">Đăng nhập</div>
                        <div className="flex flex-col items-start justify-start gap-[18px] text-base text-dimgray-100">
                            <div className="w-[568px] flex flex-col items-start justify-start gap-1">
                                <div className="self-stretch relative h-[27px]">
                                    <div className="absolute top-[0px] left-[0px]">Tên đăng nhập hoặc email</div>
                                </div>
                                <input
                                    type="text"
                                    className="p-2.5 self-stretch relative rounded-xl border-dimgray border-[1px] border-solid box-border h-14 overflow-hidden shrink-0"
                                    placeholder="Nhập tên đăng nhập hoặc email"
                                    
                                    onChange={handleUsernameChange}value={name}
                                />
                            </div>
                            <div className="flex flex-col items-end justify-start gap-2">
                                <div className="w-[568px] flex flex-col items-start justify-start gap-1">
                                    <div className="self-stretch relative h-[27px]">
                                        <div className="absolute top-[0px] left-[0px]">Mật khẩu</div>
                                        <div className="absolute top-[0px] right-[8.86px] w-[73px] h-[27px] text-right text-[18px] text-dimgray-200" onClick={toggleVisibility}>
                                            <Image className="absolute top-[3px] right-[49px] w-6 h-6 overflow-hidden" alt="" src={isVisible ? eyeslash : eye} />
                                            <div className="absolute top-[0px] right-[0px] cursor-pointer">{isVisible ? "Hiện" : "Ẩn"}</div>
                                        </div>
                                    </div>
                                    <input
                                        type={isVisible ? "password" : 'text'}
                                        className="p-2.5 self-stretch relative rounded-xl border-dimgray border-[1px] border-solid box-border h-14 overflow-hidden shrink-0"
                                        placeholder='Nhập mật khẩu'
                                        onKeyDown={handleKeyDown}
                                        onChange={handlePasswordChange}value={password}
                                    />
                                </div>
                                <div className="relative [text-decoration:underline] text-gray text-right">Quên mật khẩu</div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-2 text-center text-white font-baloo-2 bg-dodgerblue">
                                <button onClick={handleLogin} className="w-[255px] rounded-lg bg-primary flex flex-row items-center justify-center py-4 px-8 box-border">
                                    Đăng nhập
                                </button>
                                <div className="flex flex-row items-start justify-start p-0.5 text-left text-darkslategray font-poppins">
                                    <div className="relative">{`Chưa có tài khoản? `}
                                        <span className="[text-decoration:underline]">
                                            <Link legacyBehavior href="/signup">
                                                <a className="btn-primary">Đăng ký ngay</a>
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[48px] left-[423px] flex flex-col items-start justify-center">
                        <div className="w-[255px] h-7" />
                    </div>
                </div>
            </div>
        </div>);
};

export default Frame;
