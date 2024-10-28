'use client';

import type { NextPage } from 'next';
import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import edit from '../assets/imgs/edit-2.svg'
import axios from '../services/api';
import { fetchUserInfo } from '../services/UserServices';
import { FaCamera } from 'react-icons/fa';

const FrameInfo: NextPage = () => {

    const getUser = async () => {
        let res = await fetchUserInfo()
        if (res && res.data) {
            setUserInfo(res.data)
            setCCCDInfo(res.data.identity_card)
            setLicenseInfo(res.data.driving_license)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: '',
        dateOfBirth: '',
        sex: '',
        phone: '',
        email: '',
        imageURL: ''
    })

    const [isEditingCCCD, setIsEditingCCCD] = useState(false);
    const [cccdInfo, setCCCDInfo] = useState({
        nationality: 'Viet Nam',
        no: '020334045023434',
        fullName: 'Trần Bá Toản',
        sex: 'Nam',
        dateOfBirth: '29/07/2003',
        imageURL: ''
    })

    // State cho thông tin giấy phép lái xe
    const [isEditingLicense, setIsEditingLicense] = useState(false);
    const [licenseInfo, setLicenseInfo] = useState({
        no: '020334045023434',
        fullName: 'Trần Bá Toản',
        birthDate: '29/07/2003',
        licenseClass: 'A1',
        imageURL: ''
    })

    const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
    const handleCCCDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCCCDInfo({ ...cccdInfo, [e.target.name]: e.target.value });
    }
    const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLicenseInfo({ ...licenseInfo, [e.target.name]: e.target.value });
    }

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

    const handleCCCDSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEditingCCCD) return
        axios.post('/api/v1/users/update-identity-card', {
            no: cccdInfo.no,
            fullName: cccdInfo.fullName,
            sex: cccdInfo.sex,
            nationality: cccdInfo.nationality,
            dateOfBirth: cccdInfo.dateOfBirth,
            imageUrl: cccdInfo.imageURL
        })
            .then((response) => {
                if (response != null) {
                    alert('Cap nhat cccd thanh cong')
                }
            })
            .catch((error) => {
                console.log(error)
            })
        setIsEditingCCCD(false);
    };

    const handleLicenseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEditingLicense) return;
        axios.post('/api/v1/users/update-driving-license', {
            no: licenseInfo.no,
            licenseClass: licenseInfo.licenseClass
        })
            .then((response) => {
                if (response != null) {
                    alert('Cap nhat GPLX thanh cong')
                }
            })
            .catch((error) => {
                console.log(error)
            })
        setIsEditingLicense(false);
    };

    const hiddenFileInput = useRef<HTMLInputElement | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const hiddenFileInput1 = useRef<HTMLInputElement | null>(null);
    const [imageSrc1, setImageSrc1] = useState<string | null>(null);
    const hiddenFileInput2 = useRef<HTMLInputElement | null>(null);
    const [imageSrc2, setImageSrc2] = useState<string | null>(null);

    const handleClick = () => {
        hiddenFileInput.current?.click();
    };
    const handleClick1 = () => {
        hiddenFileInput1.current?.click();
    };
    const handleClick2 = () => {
        hiddenFileInput2.current?.click();
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
                setUserInfo({ ...userInfo, imageURL: response.data });
            } catch (error) {
                console.error('Lỗi khi tải ảnh:', error);
            }
        }
    }
    const handleChange1 = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            setImageSrc1(URL.createObjectURL(file)); 
            const body = new FormData();
            body.append('file', file);
            try {
                const response = await axios.post('/api/v1/images/', body);
                setCCCDInfo({ ...cccdInfo, imageURL: response.data });
            } catch (error) {
                console.error('Lỗi khi tải ảnh:', error);
            }
        }
    }
    const handleChange2 = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            setImageSrc2(URL.createObjectURL(file)); 
            const body = new FormData();
            body.append('file', file);
            try {
                const response = await axios.post('/api/v1/images/', body);
                setLicenseInfo({ ...licenseInfo, imageURL: response.data });
            } catch (error) {
                console.error('Lỗi khi tải ảnh:', error);
            }
        }
    };

    return (
        <div className="w-full relative h-[1060px] text-left text-xl text-darkslategray font-baloo-2">
            <div className="absolute top-[0px] left-[0px] rounded-[23px] bg-white w-[736px] h-80 overflow-hidden text-[30px]">
                <div className="absolute top-[15px] left-[15px] w-[705px] h-10 flex flex-col items-start justify-start gap-5">
                    <div className="self-stretch flex flex-col items-end justify-center z-[0]">
                        <div className="self-stretch flex flex-row items-center justify-between">
                            <div className="w-[272px] flex flex-row items-center justify-center">
                                <div className="w-[264px] relative font-medium flex items-center h-10 shrink-0">Thông tin tài khoản</div>
                            </div>
                            <button onClick={() => setIsEditingAccount(!isEditingAccount)} className="self-stretch w-[119px] rounded-lg bg-primary flex flex-row items-center justify-center gap-0.5 text-center text-base text-white">

                                <a onClick={handleAccountSubmit} className="w-[89px] relative leading-[150%] flex items-center justify-center h-[35px] shrink-0">{isEditingAccount ? 'Lưu' : 'Chỉnh sửa'}</a>

                                <Image className="w-4 relative h-4" alt="" src={edit} />
                            </button>
                        </div>
                    </div>
                    <div className="w-[140px] absolute !m-[0] top-[70px] left-[60px] h-[218px] z-[1] text-center text-[25px]">
                        {isEditingAccount
                            ? (
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
                                        <div>
                                            <Image
                                                width={140}
                                                height={140}
                                                className="absolute top-[0px] left-[0px] rounded-[90px] w-[140px] h-[140px] object-cover hover:bg-smoke transition-all"
                                                src={imageSrc}
                                                alt="Uploaded preview"
                                            />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-[90px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                        <FaCamera className="text-white text-3xl" />
                                    </div>

                                </div>)
                            : (
                            (userInfo.imageURL == '') ? <Image className="absolute top-[0px] left-[0px] rounded-[90px] w-[140px] h-[140px] object-cover" alt="" src={userInfo.imageURL} /> : <></>
                            )
                        }

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
                                value={userInfo.dateOfBirth}
                                onChange={handleAccountChange}
                                className="relative text-xl text-black"
                            />
                        ) : (
                            <div className="relative text-xl text-black">{userInfo.dateOfBirth}</div>
                        )}
                    </div>
                    <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                        <div className="relative">Giới tính</div>
                        {isEditingAccount ? (
                            <input
                                type="text"
                                name="gender"
                                value={userInfo.sex}
                                onChange={handleAccountChange}
                                className="relative text-xl text-black"
                            />
                        ) : (
                            <div className="relative text-xl text-black">{userInfo.sex}</div>
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
            <div className="absolute top-[370px] left-[0px] rounded-[23px] bg-white w-[736px] h-80 overflow-hidden">
                <div className="absolute top-[67px] left-[15px] w-[339px] h-[211px] flex flex-col items-start justify-between">
                    <div className="w-[102px] h-[30px] flex flex-row items-center justify-center">
                        <div className="w-[102px] relative font-medium flex items-center h-[30px] shrink-0">Hình ảnh</div>
                    </div>
                    {isEditingCCCD
                        ? (
                            <div onClick={handleClick1} className='rounded-lg relative w-full overflow-hidden h-[181px] shrink-0 object-cover
                                                                        hover:bg-smoke transition-all duration-300'>
                                <input
                                    type="file"
                                    ref={hiddenFileInput1}
                                    onChange={handleChange1}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                                {imageSrc1 && (
                                    <div>
                                        <Image
                                            width={339}
                                            height={211}
                                            className="relative max-w-full overflow-hidden h-[181px] shrink-0 object-cover"
                                            src={imageSrc1}
                                            alt="Uploaded preview"
                                        />
                                    </div>
                                )}
                            </div>
                        )
                        : (
                          (cccdInfo.imageURL == '') ? <Image className="rounded-lg relative w-full h-full overflow-hidden shrink-0 object-cover" alt="" src={cccdInfo.imageURL} /> : <></>
                        )
                    }
                </div>
                <div className="absolute top-[67px] left-[373px] w-[347px] h-[244px] text-center text-base text-dimgray">
                    <div className="absolute top-[30px] left-[0px] rounded-lg bg-whitesmoke w-[353px] h-[214px] flex flex-col items-start justify-between p-[15px] box-border">
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Số CCCD</div>
                            {isEditingCCCD ? (
                                <input
                                    type="text"
                                    name="cccd"
                                    value={cccdInfo.no}
                                    onChange={handleCCCDChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{cccdInfo.no}</div>
                            )}
                        </div>
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Họ và tên</div>
                            {isEditingCCCD ? (
                                <input
                                    type="text"
                                    name="fullName"
                                    value={cccdInfo.fullName}
                                    onChange={handleCCCDChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{cccdInfo.fullName}</div>
                            )}
                        </div>
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Giới tính</div>
                            {isEditingCCCD ? (
                                <input
                                    type="text"
                                    name="gender"
                                    value={cccdInfo.sex}
                                    onChange={handleCCCDChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{cccdInfo.sex}</div>
                            )}
                        </div>
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Ngày sinh</div>
                            {isEditingCCCD ? (
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={cccdInfo.dateOfBirth}
                                    onChange={handleCCCDChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{cccdInfo.dateOfBirth}</div>
                            )}
                        </div>
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Quốc tịch</div>
                            {isEditingCCCD ? (
                                <input
                                    type="text"
                                    name="nationality"
                                    value={cccdInfo.nationality}
                                    onChange={handleCCCDChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{cccdInfo.nationality}</div>
                            )}
                        </div>
                    </div>
                    <div className="absolute top-[0px] left-[1px] w-[170px] h-[30px] flex flex-row items-center justify-center text-left text-xl text-darkslategray">
                        <div className="w-[170px] relative font-medium flex items-center h-[30px] shrink-0">Thông tin chung</div>
                    </div>
                </div>
                <div className="absolute top-[15px] left-[15px] w-[705px] h-10 flex flex-col items-start justify-start text-8xl">
                    <div className="self-stretch flex flex-col items-end justify-center">
                        <div className="self-stretch flex flex-row items-center justify-between">
                            <div className="w-[230px] flex flex-row items-center justify-center">
                                <div className="w-[230px] relative font-medium flex items-center text-[27px] h-10 shrink-0">Căn cước công dân</div>
                            </div>
                            <button onClick={() => setIsEditingCCCD(!isEditingCCCD)} className="self-stretch w-[119px] rounded-lg bg-primary flex flex-row items-center justify-center gap-0.5 text-center text-base text-white">
                                <a onClick={handleCCCDSubmit} className="w-[89px] relative leading-[150%] flex items-center justify-center h-[35px] shrink-0">{isEditingCCCD ? 'Lưu' : 'Chỉnh sửa'}</a>
                                <Image className="w-4 relative h-4" alt="" src={edit} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-[740px] left-[0px] rounded-[23px] bg-white w-[736px] h-80 overflow-hidden">
                <div className="absolute top-[67px] left-[15px] w-[339px] h-[211px] flex flex-col items-start justify-between">
                    <div className="w-[102px] h-[30px] flex flex-row items-center justify-center">
                        <div className="w-[102px] relative font-medium flex items-center h-[30px] shrink-0">Hình ảnh</div>
                    </div>
                    {isEditingLicense
                        ? (
                            <div onClick={handleClick2} className='rounded-lg relative w-full overflow-hidden h-[181px] shrink-0 object-cover
                                                                        hover:bg-smoke transition-all duration-300'>
                                <input
                                    type="file"
                                    ref={hiddenFileInput2}
                                    onChange={handleChange2}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                                {imageSrc2 && (
                                    <div>
                                        <Image
                                            width={339}
                                            height={211}
                                            className="relative max-w-full overflow-hidden h-[181px] shrink-0 object-cover"
                                            src={imageSrc2}
                                            alt="Uploaded preview"
                                        />
                                    </div>
                                )}
                            </div>
                        )
                        : (
                         (licenseInfo.imageURL == '') ?  <Image className="rounded-lg relative w-full h-full overflow-hidden shrink-0 object-cover" alt="" src={licenseInfo.imageURL} /> : <></> 
                        )
                    }
                </div>
                <div className="absolute top-[67px] left-[373px] w-[347px] h-[214px] text-center text-base text-dimgray">
                    <div className="absolute top-[30px] left-[0px] rounded-lg bg-whitesmoke w-[353px] h-[94px] flex flex-col items-start justify-between p-[15px] box-border">
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Số GPLX</div>
                            {isEditingLicense ? (
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    value={licenseInfo.no}
                                    onChange={handleLicenseChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{licenseInfo.no}</div>
                            )}
                        </div>
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Hạng</div>
                            {isEditingLicense ? (
                                <input
                                    type="text"
                                    name="licenseClass"
                                    value={licenseInfo.licenseClass}
                                    onChange={handleLicenseChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{licenseInfo.licenseClass}</div>
                            )}
                        </div>
                    </div>
                    <div className="absolute top-[0px] left-[1px] w-[170px] h-[30px] flex flex-row items-center justify-center text-left text-xl text-darkslategray">
                        <div className="w-[170px] relative font-medium flex items-center h-[30px] shrink-0">Thông tin chung</div>
                    </div>
                </div>
                <div className="absolute top-[15px] left-[15px] w-[705px] h-10 flex flex-col items-start justify-start text-8xl">
                    <div className="self-stretch flex flex-col items-end justify-center">
                        <div className="self-stretch flex flex-row items-center justify-between">
                            <div className="w-[210px] flex flex-row items-center justify-center">
                                <div className="w-[210px] relative font-medium flex items-center text-[27px] h-10 shrink-0">Giấy phép lái xe</div>
                            </div>
                            <button onClick={() => setIsEditingLicense(!isEditingLicense)} className="self-stretch w-[119px] rounded-lg bg-primary flex flex-row items-center justify-center gap-0.5 text-center text-base text-white">
                                <a onClick={handleLicenseSubmit} className="w-[89px] relative leading-[150%] flex items-center justify-center h-[35px] shrink-0">{isEditingLicense ? 'Lưu' : 'Chỉnh sửa'}</a>
                                <Image className="w-4 relative h-4" alt="" src={edit} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default FrameInfo;
