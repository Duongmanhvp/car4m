'use client'
import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import frame from '../assets/imgs/Frame.svg';
import logo from '../assets/imgs/logo.png';
import userIcon from '../assets/imgs/user-icon.svg';
import { fetchUserInfo } from '../services/UserServices';
import { useRouter } from 'next/navigation';
import jwt, { JwtPayload } from 'jsonwebtoken';

const Header: NextPage = () => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [admin, setAdmin] = useState(false)
    const accesstoken = localStorage.getItem('access_token')

    const validateToken = async () => {
        if (!accesstoken) return false;
        try {
            const response = await fetch('http://localhost:8080/api/v1/auths/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: accesstoken }),
            });


            if (response) {
                setIsLoggedIn(true);

            } else {
                await refreshToken();
            }
        } catch (error) {
            console.error('Validation error:', error)
        }
    };


    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) return;

        try {
            const response = await fetch('http://localhost:8080/api/v1/auths/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.data)
                validateToken();
            } else {
                setIsLoggedIn(false);
                localStorage.clear;
            }
        } catch (error) {
            console.error('Refresh error:', error)
        }
    }

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/auths/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: accesstoken }),
            });


            if (response.ok) {
                localStorage.clear()
                router.push('/home')
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Đăng xuat thất bại');
            }
        } catch (error) {
            console.error('Validation error:', error);
        }
    }

    const getUser = async () => {
        if (accesstoken) {
            const decode = jwt.decode(accesstoken) as JwtPayload
            if (decode.scope == "ROLE_ADMIN") {
                setAdmin(!admin)
            }
        }
        try {
            let res = await fetchUserInfo()
            if (res && res.data) {
                setUser(res.data)
            }
        } catch (error) {
            console.log('Chua co du lieu nguoi dung', error)
        }
    }

    useEffect(() => {
        if (accesstoken) {
            validateToken()
            getUser()
        }
    }, [])


    const nextRegistry = () => {
        router.push('/registrycar')
    }

    const handleNext = (next: string) => {
        if (next == 'logout') {
            handleLogout()
        }
        else {
            router.push('/profile')
        }
    }

    return (
        <div className="w-full flex justify-center relative bg-primary-0 border-lightsteelblue h-[100px] overflow-hidden text-left text-base text-darkslategray font-baloo-2">
            <div className="relative w-[1120px] flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-start gap-2 text-center text-primary font-baloo">
                    <a href="/home" className="flex flex-row items-center justify-start gap-2 text-center text-primary font-baloo">
                        <Image className="w-12 relative h-[50] overflow-hidden shrink-0" alt="Logo" src={frame} />
                        <Image className="w-20 relative h-[40] overflow-hidden shrink-0" alt="Logo" src={logo} />
                    </a>
                </div>
                <div className="flex flex-row items-center justify-center gap-10">
                    <div onClick={nextRegistry} className="relative leading-[150%] font-medium cursor-pointer">Trở thành chủ xe</div>
                    <div className="relative leading-[150%] font-medium">Thuê xe</div>
                    <div className="relative leading-[150%] font-medium">Về car4m</div>
                </div>
                <div className="flex flex-row items-center justify-start gap-6">
                    {isLoggedIn ? (
                        <div onClick={() => admin ? handleNext('logout') : handleNext('profile')} className="relative flex items-center gap-2 font-baloo-2 font-medium cursor-pointer">
                            <Image className="w-10 h-10 object-cover rounded-full" alt="User Icon" src={userIcon} />
                            <span>{user?.username || 'Người dùng'}</span>
                        </div>
                    ) : (
                        <>
                            <div className="relative leading-[150%] font-medium">
                                <Link legacyBehavior href="/signin">
                                    <a className="btn-accent hover-up-2">Đăng nhập</a>
                                </Link>
                            </div>
                            <div className="rounded-lg bg-primary flex flex-row items-center justify-center py-4 px-8 text-center text-primary-0 hover-effect">
                                <div className="w-[77px] relative leading-[150%] font-medium flex items-center justify-center shrink-0 text-white">
                                    <Link legacyBehavior href="/signup">
                                        <a className="btn-primary">Đăng ký</a>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
