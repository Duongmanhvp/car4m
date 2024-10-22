'use client';

import type { NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import edit from '../assets/imgs/edit-2.svg'


const FrameInfo: NextPage = () => {

    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [userInfo, setUserInfo] = useState({
        birthDate: '29/07/2003',
        gender: 'Nam',
        phone: '0368432906',
        email: 'trantoan29072003@gmail.com',
    });

    const [isEditingCCCD, setIsEditingCCCD] = useState(false);
    const [cccdInfo, setCCCDInfo] = useState({
        cccd: '020334045023434',
        fullName: 'Trần Bá Toản',
        gender: 'Nam',
        birthDate: '29/07/2003',
    });

    // State cho thông tin giấy phép lái xe
    const [isEditingLicense, setIsEditingLicense] = useState(false);
    const [licenseInfo, setLicenseInfo] = useState({
        licenseNumber: '020334045023434',
        fullName: 'Trần Bá Toản',
        birthDate: '29/07/2003',
        licenseClass: 'A1',
    });

    const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleCCCDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCCCDInfo({ ...cccdInfo, [e.target.name]: e.target.value });
    };

    // Hàm xử lý thay đổi thông tin giấy phép lái xe
    const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLicenseInfo({ ...licenseInfo, [e.target.name]: e.target.value });
    };

    const handleAccountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditingAccount(false);
    };

    const handleCCCDSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Thực hiện việc lưu thông tin CCCD ở đây
        setIsEditingCCCD(false);
    };

    // Hàm xử lý lưu thông tin giấy phép lái xe
    const handleLicenseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Thực hiện việc lưu thông tin GPLX ở đây
        setIsEditingLicense(false);
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
                                <div className="w-[72px] h-[37px] flex flex-col items-center justify-center">
                                    <button onClick={handleAccountSubmit} className="w-[89px] relative leading-[150%] flex items-center justify-center h-[35px] shrink-0">{isEditingAccount ? 'Lưu' : 'Chỉnh sửa'}</button>
                                </div>
                                <Image className="w-4 relative h-4" alt="" src={edit} />
                            </button>
                        </div>
                    </div>
                    <div className="w-[140px] absolute !m-[0] top-[70px] left-[60px] h-[218px] z-[1] text-center text-[25px]">
                        <img className="absolute top-[0px] left-[0px] rounded-[90px] w-[140px] h-[140px] object-cover" alt="" src="Image.png" />
                        <div className="absolute top-[154px] left-[0px] w-[140px] h-[30px] flex flex-row items-center justify-center">
                            <div className="w-[140px] relative font-medium flex items-center justify-center h-[30px] shrink-0">Trần Toản</div>
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
            <div className="absolute top-[370px] left-[0px] rounded-[23px] bg-white w-[736px] h-80 overflow-hidden">
                <div className="absolute top-[67px] left-[15px] w-[339px] h-[211px] flex flex-col items-start justify-between">
                    <div className="w-[102px] h-[30px] flex flex-row items-center justify-center">
                        <div className="w-[102px] relative font-medium flex items-center h-[30px] shrink-0">Hình ảnh</div>
                    </div>
                    <img className="self-stretch relative max-w-full overflow-hidden h-[181px] shrink-0 object-cover" alt="" src="Frame 18693.png" />
                </div>
                <div className="absolute top-[67px] left-[373px] w-[347px] h-[214px] text-center text-base text-dimgray">
                    <div className="absolute top-[30px] left-[0px] rounded-lg bg-whitesmoke w-[353px] h-[184px] flex flex-col items-start justify-between p-[15px] box-border">
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Số CCCD</div>
                            {isEditingCCCD ? (
                                <input
                                    type="text"
                                    name="cccd"
                                    value={cccdInfo.cccd}
                                    onChange={handleCCCDChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{cccdInfo.cccd}</div>
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
                                    value={cccdInfo.gender}
                                    onChange={handleCCCDChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{cccdInfo.gender}</div>
                            )}
                        </div>
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Ngày sinh</div>
                            {isEditingCCCD ? (
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={cccdInfo.birthDate}
                                    onChange={handleCCCDChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{cccdInfo.birthDate}</div>
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
                                <div className="w-[72px] h-[37px] flex flex-col items-center justify-center">
                                    <button onClick={handleCCCDSubmit} className="w-[89px] relative leading-[150%] flex items-center justify-center h-[35px] shrink-0">{isEditingCCCD ? 'Lưu' : 'Chỉnh sửa'}</button>
                                </div>
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
                    <img className="self-stretch relative max-w-full overflow-hidden h-[181px] shrink-0 object-cover" alt="" src="Frame 18693.png" />
                </div>
                <div className="absolute top-[67px] left-[373px] w-[347px] h-[214px] text-center text-base text-dimgray">
                    <div className="absolute top-[30px] left-[0px] rounded-lg bg-whitesmoke w-[353px] h-[184px] flex flex-col items-start justify-between p-[15px] box-border">
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Số GPLX</div>
                            {isEditingLicense ? (
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    value={licenseInfo.licenseNumber}
                                    onChange={handleLicenseChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{licenseInfo.licenseNumber}</div>
                            )}
                        </div>
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Họ và tên</div>
                            {isEditingLicense ? (
                                <input
                                    type="text"
                                    name="fullName"
                                    value={licenseInfo.fullName}
                                    onChange={handleLicenseChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{licenseInfo.fullName}</div>
                            )}
                        </div>
                        <div className="self-stretch h-[26px] flex flex-row items-center justify-between">
                            <div className="relative">Ngày sinh</div>
                            {isEditingLicense ? (
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={licenseInfo.birthDate}
                                    onChange={handleLicenseChange}
                                    className="relative text-xl text-black"
                                />
                            ) : (
                                <div className="relative text-xl text-black">{licenseInfo.birthDate}</div>
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
                                <div className="w-[72px] h-[37px] flex flex-col items-center justify-center">
                                    <button onClick={handleLicenseSubmit} className="w-[89px] relative leading-[150%] flex items-center justify-center h-[35px] shrink-0">{isEditingLicense ? 'Lưu' : 'Chỉnh sửa'}</button>
                                </div>
                                <Image className="w-4 relative h-4" alt="" src={edit} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};

export default FrameInfo;
