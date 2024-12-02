'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

import istarline from '../assets/imgs/star-line.svg'
import istar from '../assets/imgs/star.svg'
import { getMyReview, postReview } from '../services/OrderService';

interface ReviewProps {
    rental_id: number
    onToggleFrame: (id: number) => void
}

const ReivewFrame: React.FC<ReviewProps> = ({ rental_id, onToggleFrame }) => {
    const [rating, setRating] = useState(0); // Lưu trữ đánh giá hiện tại
    const [hover, setHover] = useState(0); // Lưu trữ ngôi sao đang hover
    const [text, setText] = useState('')

    const upReview = async () => {
        try {
            const response = await postReview(text, rating, rental_id)
            console.log(response)
        } catch (error) {
            console.log('Loi khi danh gia', error)
        }
    }

    const getReview = async (id: number) => {
        try {
            const response = await getMyReview(id)
            setRating(response.data.vote)
            setText(response.data.description)
        } catch (error) {
            console.log("Loi khi lay review", error)
        }
    }

    const handleReview = () => {
        upReview()
    }

    useEffect(() => {
        getReview(rental_id)
    }, [rental_id])

    return (
        <div className="fixed inset-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-10 font-baloo-2">
            <div className="w-[700px] bg-white rounded-lg p-6 shadow-lg relative z-20 flex-col items-center justify-center">
                <button className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center border border-dimgray rounded-full" onClick={() => onToggleFrame(0)}>
                    <span className="items-center justify-center text-dimgray font-semibold">&#x2715;</span>
                </button>
                <h1 className="text-xxl font-medium text-center mb-4 border-b border-line">{rating ? "Đánh giá của bạn" : "Đánh giá"}</h1>
                
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2 text-xl items-center'>
                        <span>Đánh giá chất lượng: </span>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    className={`text-xx `}
                                    onClick={() => setRating(star)} // Lưu giá trị đánh giá khi click
                                    onMouseEnter={() => setHover(star)} // Hiệu ứng hover
                                    onMouseLeave={() => setHover(0)} // Xóa hover khi di chuột ra
                                >
                                    
                                    {(hover || rating) >= star ? (<Image src={istar} alt={''}/>) : (<Image src={istarline} alt={''}/>)}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap-2 text-xl'>
                        <span> Nhận xét: </span>
                        <textarea value={text} 
                                  spellCheck="false"
                                  onChange={(e) => setText(e.target.value)} 
                                  placeholder='Hãy chia sẻ nhận xét của bạn cho chuyến này nhé!'
                                  className='w-full p-2 border border-silver rounded h-24 resize-none placeholder:text-silver'>        
                        </textarea>
                    </div>
                </div>

                <div onClick={() => onToggleFrame(0)} className='flex items-center justify-center cursor-pointer'>
                    <a onClick={() => handleReview()} className="w-[200px] flex mt-4 items-center justify-center px-4 py-2 bg-primary text-white rounded text-xl" >
                        Xác nhận
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ReivewFrame

