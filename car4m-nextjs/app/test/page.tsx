'use client';

import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import Image from 'next/image';
import axios from '../services/api';
import edit from '../assets/imgs/edit-2.svg'

const Test: NextPage = () => {
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [isEditingAccount, setIsEditingAccount] = useState(false);    
    const [userInfo, setUserInfo] = useState({
        username: '',
        birthDate: '',
        gender: '',
        phone: '',
        email: '',
        image: ""
    })

    // Hàm để mở thẻ input file ẩn
    const handleClick = () => {
        hiddenFileInput.current?.click();
    };

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            setImageSrc(URL.createObjectURL(file));  
            const body = new FormData();
            body.append('file', file);
            try {
                const response = await axios.post('/api/v1/images/', body);
                setUserInfo({ ...userInfo, image: response.data });
                
            } catch (error) {
                console.error('Lỗi khi tải ảnh:', error);
            }
        }
    }

    const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
    console.log(userInfo)
    const handleAccountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEditingAccount) return
        axios.post('/api/v1/users/update-my-info', {
            email: userInfo.email,
            phone: userInfo.phone
        })
            .then((response) => {
                console.log("123456780")
                if (response != null) {
                    alert('Cap nhat user thanh cong')
                }
            })
            .catch((error) => {
                console.log(error)
            })
        setIsEditingAccount(false);
    };

    return (
        <div>
            {/* Input file ẩn để chọn ảnh */}
            {/* <div onClick={handleClick} className='absolute top-[500px] left-[500px] rounded-lg bg-gray w-[450px] h-44 flex flex-col items-start justify-between p-[15px] box-border text-center text-base text-white'>
                <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                accept="image/*"
                style={{ display: 'none' }}
                />
                {imageSrc && (
                <a>
                    <Image 
                        className='w-full h-44 rounded-lg'
                        src={imageSrc}
                        alt="Uploaded preview"
                        
                        // style={{ borderRadius: '8px', objectFit: 'cover' }}
                    />
                </a>
            )}
            </div> */}
            <div className="absolute top-[0px] left-[0px] rounded-[23px] bg-white w-[736px] h-80 overflow-hidden text-[30px]">
                <div className="absolute top-[15px] left-[15px] w-[705px] h-10 flex flex-col items-start justify-start gap-5">
                    <div className="self-stretch flex flex-col items-end justify-center z-[0]">
                        <div className="self-stretch flex flex-row items-center justify-between">
                            <div className="w-[272px] flex flex-row items-center justify-center">
                                <div className="w-[264px] relative font-medium flex items-center h-10 shrink-0">Thông tin tài khoản</div>
                            </div>
                            <div onClick={() => setIsEditingAccount(!isEditingAccount)} className="self-stretch w-[119px] rounded-lg bg-primary flex flex-row items-center justify-center gap-0.5 text-center text-base text-white">

                                <a  className="w-[89px] relative leading-[150%] flex items-center justify-center h-[35px] shrink-0">{isEditingAccount ? 'Lưu' : 'Chỉnh sửa'}</a>
                                <a className="self-stretch w-[119px] rounded-lg bg-primary flex flex-row items-center justify-center gap-0.5 text-center text-base text-white">
                                    <Image className="w-4 relative h-4"  alt="" src={edit} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-[140px] absolute !m-[0] top-[70px] left-[60px] h-[218px] z-[1] text-center text-[25px]">
                        
                                <div onClick={handleClick} className='cursor-pointer absolute top-[0px] left-[0px] rounded-[90px] w-[140px] h-[140px] object-cover
                                        hover:bg-smoke transition-all duration-300'>
                                    <input
                                        type="file"
                                        ref={hiddenFileInput}
                                        onChange={handleChange}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                    {imageSrc && (
                                        <a className='cursor-pointer absolute top-[0px] left-[0px] rounded-[90px] w-[140px] h-[140px] object-cover
                                        hover:bg-smoke transition-all duration-300'>
                                            <Image  
                                                width={140}
                                                height={140}
                                                className="w-4 h-4 relative"
                                                src={imageSrc}
                                                alt="Uploaded preview"
                                            />
                                        </a>
                                    )}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-[90px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                       
                                    </div>

                                </div>

                        <div className="absolute top-[154px] left-[0px] w-[140px] h-[30px] flex flex-row items-center justify-center">
                            <div className="w-[140px] relative font-medium flex items-center justify-center h-[30px] shrink-0"> {userInfo.username} </div>
                        </div>
                        <div className="absolute top-[198px] left-[0px] w-[140px] h-5 flex flex-row items-center justify-between text-[15px] text-dimgray">
                            <div className="relative">Tham gia:</div>
                            <div className="relative text-dimgray">29/07/2003</div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-[85px] left-[270px] rounded-lg bg-whitesmoke w-[450px] h-44 flex flex-col items-start justify-between p-[15px] box-border text-center text-base text-dimgray">
                    <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                        <div className="relative">Ngày sinh</div>
                        {isEditingAccount ? (
                            <input
                                type="date"
                                name="birthDate"
                                value={userInfo.birthDate}
                                onChange={handleAccountChange}
                                className="relative text-xl text-black"
                            />
                        ) : (
                            <div className="relative text-xl text-black">{userInfo.birthDate}</div>
                        )}
                    </div>
                    <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                        <div className="relative">Giới tính</div>
                        {isEditingAccount ? (
                            <input
                                type="text"
                                name="gender"
                                value={userInfo.gender}
                                onChange={handleAccountChange}
                                className="relative text-xl text-black"
                            />
                        ) : (
                            <div className="relative text-xl text-black">{userInfo.gender}</div>
                        )}
                    </div>
                    <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                        <div className="relative">Số điện thoại</div>
                        {isEditingAccount ? (
                            <input
                                type="text"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleAccountChange}
                                className="relative text-xl text-black"
                            />
                        ) : (
                            <div className="relative text-xl text-black">{userInfo.phone}</div>
                        )}
                    </div>
                    <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                        <div className="relative">Email</div>
                        {isEditingAccount ? (
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleAccountChange}
                                className="relative text-xl text-black"
                            />
                        ) : (
                            <div className="relative text-xl text-black">{userInfo.email}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Test;
