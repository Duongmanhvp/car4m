import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../assets/imgs/Frame.svg'


const Footer = () => {
  return (
    <footer className="bg-gray-200  pt-10 pb-5 font-baloo-2">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image src={logo} alt="Car4M Logo" width={50} height={50} />
            <p className="mt-4">6677 1508</p>
            <p className="text-sm text-gray-600">Tổng đài hỗ trợ: 7AM - 10PM</p>
            <p className="mt-2">contact@car4m.vn</p>
            <p className="text-sm text-gray-600">Gửi mail cho Car4M</p>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">TikTok</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Chính Sách</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Chính sách và quy định</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Quy chế hoạt động</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Bảo mật thông tin</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Giải quyết tranh chấp</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Tìm Hiểu Thêm</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Hướng dẫn chung</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Hướng dẫn đặt xe</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Hướng dẫn thanh toán</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Hỏi và trả lời</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Đối Tác</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Đăng ký chủ xe Car4M</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Đăng ký GPS Car+ 4G</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-900">Đăng ký cho thuê xe dài hạn Car4M</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-l ">&copy; Công ty Cổ Phần Car4M</p>
          <address className="text-l  mt-2">
            Địa chỉ: Giảng đường 2, Đại học Công Nghệ, Đại học Quốc Gia Hà Nội<br />
            144 Xuân Thủy, Cầu Giấy, Hà Nội
          </address>
        </div>

        <div className="mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:justify-between">
          <Image src="/images/bocongthuong.png" alt="Đã đăng ký Bộ Công Thương" width={200} height={40} />
          <div className='flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4'>
            <p className="text-sm text-gray-600">Hỗ trợ thanh toán qua</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['momo', 'vnpay', 'zalopay', 'visa'].map((payment) => (
                <Image key={payment} src={`/images/${payment}-logo.png`} alt={`${payment} logo`} width={40} height={40} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;