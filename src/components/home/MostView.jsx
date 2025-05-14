"use client";

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import useData from "@/utils/useData"
import { useEffect, useState } from "react"
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import appConfig from '@/config/appConfig';
import { FaBook, FaSquare } from 'react-icons/fa6';
import {RiQuillPenAiLine} from 'react-icons/ri'
import { BookGridItemBottomBar } from './BookGridItem';
import BookCover from '../book/BookCover';
const swiperBreakpoints = {
    360: {
        slidesPerView: 1,
    },
    525: {
        slidesPerView: 1,
    },
    648: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 3,
    },
    992: {
        slidesPerView: 4,
    },
    1364: {
        slidesPerView: 4,
    },
    1440: {
        slidesPerView: 4
    }

};

export default function MostView() {
    const { get } = useData();
    const { translations, language } = useLanguage()
    const [data, setData] = useState();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await get(`${appConfig.apiBaseUrl}/api/book/MostViewedBooks`, setData)
    }

    return <>
        <section className="relative w-full h-auto lg:px-12 xl:px-22 2xl:px-52 md:px-24 sm:px-16 px-4 mb-16">
            <img src="/static/media/theme/Rectangle 12621.png" width="100%" alt="" />

            <div className="flex justify-between relative -top-5">
                <div style={{ display: "block ruby" }} className="bg-white pe-4">
                    <FaSquare className='rotate-45' size={10} />
                    <h2 className='ms-2 font-bold'>
                        {translations.most_visited}
                    </h2>
                </div>
                <div className="bg-white ps-2">
                    <Link href={`/${language}/books`} className="border border-gray-300 px-4 pt-1 rounded hover:bg-[#DBA100] hover:text-white">
                        {translations.view_all}
                    </Link>
                </div>
            </div>
            <div className="slider flex space-x-6 justify-center">
                <Swiper
                    className='swiper swiper3'
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={swiperBreakpoints}
                    autoplay={{ enabled: true, delay: 5000 }}
                    spaceBetween={50}
                    speed={1500}
                    a11y={true}
                    navigation={{
                        enabled: true,
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }}
                >
                    {
                        data?.length > 0 && data.map(item => {
                            return <SwiperSlide>

                                <div className="p-2 flex flex-col h-full bg-[#F6F6F6] rounded" style={{ boxShadow: '1px 1px 10px #E6E6E6', border: '1px solid #F6F6F6' }}>
                                    <div className="flex gap-1 mb-2 items-center">
                                        <FaBook className='flex-shrink-0 text-sm text-teal-600 h-5' />
                                        <p className="font-bold text-[#6B6B6B] ms-1 line-clamp-1 text-xs">{item.BookTitle}</p>
                                    </div>
                                    <div className="image-cover-container bg-white border  rounded-b-none border-gray-300 rounded p-4">
                                        <BookCover bookId={item.BookId} className={'w-40 image-cover rounded-t-md'} />
                                    </div>
                                    <div className="flex items-center py-2 px-2 bg-gray-200 text-gray-600 rounded-b">
                                        <RiQuillPenAiLine className='flex-shrink-0 h-4 me-1'/>
                                        <p className="text-sm text-dark ms-1 line-clamp-1">
                                            {item.Author?.[0]}
                                        </p>
                                    </div>
                                    <div className='flex-grow'>
                                        {
                                            item.Publisher?.[0] && <p className="text-justify my-3 line-clamp-1 text-[#4B4B4B]" style={{ fontSize: '14px' }}>
                                                {item.Publisher?.[0]}
                                            </p>
                                        }
                                    </div>

                                    <BookGridItemBottomBar book={item}/>
                                </div>
                            </SwiperSlide>
                        })
                    }
                    <div className="swiper-button-next">
                    </div>
                    <div className="swiper-button-prev">
                    </div>
                </Swiper>
            </div>
        </section>

    </>
}