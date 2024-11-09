'use client'
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import user from '../assets/imgs/user.svg';
import heart from '../assets/imgs/heart.svg';
import car from '../assets/imgs/car.svg';
import map from '../assets/imgs/map.svg';
import lock from '../assets/imgs/lock.svg';
import out from '../assets/imgs/logout.svg';
import Header from '../home/header';
import Resetpw from './resetpw';
import { access } from 'fs';
import UserInfo from './myinfo';
import Footer from '../home/footer';


const Profile: NextPage = () => {
  const [activeSection, setActiveSection] = useState('myinfo'); // Quản lý trạng thái phần hiện tại
  const accessToken = localStorage.getItem('access_token')
  // Nội dung các frame khác nhau
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'myinfo':
        return <><UserInfo/></>
      case 'myfav':
        return <div>Danh sách xe yêu thích của bạn...</div>;
      case 'mycar':
        return <div>Danh sách xe của bạn...</div>;
      case 'mytrip':
        return <div>Chuyến đi của bạn...</div>;
      case 'resetpw':
        return <><Resetpw /></>
      default:
        return null;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auths/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: accessToken }),
      });


      if (response.ok) {
        localStorage.clear()
        window.location.href = '/home'
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Đăng xuat thất bại');
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  }

  return (
    <>
      <Header />
      <div className="w-full flex flex-col relative bg-whitesmoke h-[1140px] text-left text-11xl text-darkslategray-100 font-baloo-2">
        <div className="absolute top-[82px] left-[calc(50%_-_560px)] w-[367px] h-[681px] flex flex-col items-center justify-start gap-6">
          <div className="w-[367px] border-smoke border-b-[1px] border-solid box-border h-[81px] flex flex-col items-start justify-start text-[48px] text-darkslatesmoke">
            <div className="self-stretch relative leading-[130%] font-medium flex items-center h-[47px] shrink-0">
              Xin chào bạn!
            </div>
          </div>
          <div className="w-[367px] border-silver border-b-[1px] border-solid box-border h-[277px] flex flex-col items-start justify-start gap-6">
            <div
              className={`self-stretch h-[46px] flex flex-row items-center justify-start gap-4 cursor-pointer hover:bg-smoke transition-all ${activeSection === 'myinfo' ? 'font-medium border-l-4 border-blue-500 pl-4' : ''
                }`}
              onClick={() => setActiveSection('myinfo')}
            >
              <Image className="w-8 relative h-8" alt="" src={user} />
              <div className="w-[319px] h-[37px] flex flex-col items-start justify-center">
                <div className="w-[300px] relative leading-[150%] flex items-center h-[35px] shrink-0">
                  Tài khoản của tôi
                </div>
              </div>
            </div>
            <div
              className={`self-stretch h-[46px] flex flex-row items-center justify-start gap-4 cursor-pointer hover:bg-smoke transition-all ${activeSection === 'myfav' ? 'font-medium border-l-4 border-blue-500 pl-4' : ''
                }`}
              onClick={() => setActiveSection('myfav')}
            >
              <Image className="w-8 relative h-8" alt="" src={heart} />
              <div className="w-[319px] h-[37px] flex flex-col items-start justify-center">
                <div className="w-[300px] relative leading-[150%] flex items-center h-[35px] shrink-0">
                  Xe yêu thích
                </div>
              </div>
            </div>
            <div
              className={`self-stretch h-[46px] flex flex-row items-center justify-start gap-4 cursor-pointer hover:bg-smoke transition-all ${activeSection === 'mycar' ? 'font-medium border-l-4 border-blue-500 pl-4' : ''
                }`}
              onClick={() => setActiveSection('mycar')}
            >
              <Image className="w-8 relative h-8" alt="" src={car} />
              <div className="w-[319px] h-[37px] flex flex-col items-start justify-center">
                <div className="w-[300px] relative leading-[150%] flex items-center h-[35px] shrink-0">
                  Xe của tôi
                </div>
              </div>
            </div>
            <div
              className={`self-stretch h-[46px] flex flex-row items-center justify-start gap-4 cursor-pointer hover:bg-smoke transition-all ${activeSection === 'mytrip' ? 'font-medium border-l-4 border-blue-500 pl-4' : ''
                }`}
              onClick={() => setActiveSection('mytrip')}
            >
              <Image className="w-8 relative h-8" alt="" src={map} />
              <div className="w-[319px] h-[37px] flex flex-col items-start justify-center">
                <div className="w-[300px] relative leading-[150%] flex items-center h-[35px] shrink-0">
                  Chuyến của tôi
                </div>
              </div>
            </div>
          </div>
          <div className="w-[367px] h-[129px] flex flex-col items-start justify-start gap-6">
            <div
              className={`self-stretch h-[46px] flex flex-row items-center justify-start gap-4 cursor-pointer hover:bg-smoke transition-all ${activeSection === 'resetpw' ? 'font-medium border-l-4 border-blue-500 pl-4' : ''
                }`}
              onClick={() => setActiveSection('resetpw')}
            >
              <Image className="w-8 relative h-8" alt="" src={lock} />
              <div className="w-[319px] h-[37px] flex flex-col items-start justify-center">
                <div className="w-[300px] relative leading-[150%] flex items-center h-[35px] shrink-0">
                  Đổi mật khẩu
                </div>
              </div>
            </div>
            <div className="self-stretch h-[46px] flex flex-row items-center justify-start gap-4 text-red cursor-pointer hover:bg-smoke transition-all">
              <Image className="w-8 relative h-8" alt="" src={out} />
              <div className="w-[319px] h-[37px] flex flex-col items-start justify-center">
                <div onClick={handleLogout} className="w-[300px] relative leading-[150%] flex items-center h-[35px] shrink-0">
                  Đăng xuất
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[82px] right-[calc(50%_-_560px)] w-[736px]">
          {renderSectionContent()}
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Profile;
