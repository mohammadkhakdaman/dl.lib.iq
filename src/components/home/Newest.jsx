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
import { HiEye } from 'react-icons/hi';
import { BsBookmark } from 'react-icons/bs';
import BookCover from '../book/BookCover';
import BookGridItem from './BookGridItem';

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

export default function Newest() {
    const { get } = useData();
    const { translations, language } = useLanguage()
    const [data, setData] = useState();

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await get(`${appConfig.apiBaseUrl}/api/book/LatastBooks`, setData)
    }

    return <>
        <section className="relative w-full h-auto lg:px-12 xl:px-22 2xl:px-52 md:px-24 sm:px-16 px-4 mb-16">
            <img src="/static/media/theme/Rectangle 12621.png" width="100%" alt="" />
            <div className="flex justify-between relative -top-5">
                <div style={{ display: "block ruby" }} className="bg-white pe-4">
                    <FaSquare className='rotate-45' size={10} />
                    <h2 className='ms-2 font-bold'>
                        {translations.latest_books}
                    </h2>
                </div>
                <div className="bg-white ps-2">
                    <Link href={`/${language}/books`}  className="border border-gray-300 px-4 pt-1 rounded hover:bg-[#DBA100] hover:text-white">
                        {translations.view_all}
                    </Link>
                </div>
            </div>
            <div className="slider flex space-x-6 justify-center">
                <Swiper
                    className='swiper swiper3'
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={swiperBreakpoints}
                    autoplay={{ enabled: true, delay: 115000 }}
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
                                <BookGridItem className='h-full' book={item}/>
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