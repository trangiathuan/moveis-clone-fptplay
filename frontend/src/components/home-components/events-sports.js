import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const EventSports = () => {
    return (
        <div className="text-white pt-6">
            <div className="flex flex-col">
                <div className=''>
                    <p className="text-2xl font-bold pt-10 pb-4 container mx-auto px-5 sm:px-5 lg:px-5 xl:px-16">Sự kiện thể thao</p>
                </div>
                <div className='w-full container mx-auto px-5 sm:px-5 lg:px-4 xl:px-16'>
                    <Swiper
                        spaceBetween={10}
                        grabCursor={true}
                        className="mySwiper"
                        breakpoints={{
                            1050: {
                                slidesPerView: 5.2,
                            },
                            850: {
                                slidesPerView: 4.2,
                            },
                            740: {
                                slidesPerView: 3.5,
                            },
                            540: {
                                slidesPerView: 2.5,
                            },
                            320: {
                                slidesPerView: 1.8,
                            },
                            200: {
                                slidesPerView: 1,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-[207px] h-[116px] rounded-lg object-cover' src={require('../../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-[207px] h-[116px] rounded-lg object-cover' src={require('../../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-[207px] h-[116px] rounded-lg object-cover' src={require('../../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-[207px] h-[116px] rounded-lg object-cover' src={require('../../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-[207px] h-[116px] rounded-lg object-cover' src={require('../../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-[207px] h-[116px] rounded-lg object-cover' src={require('../../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default EventSports;