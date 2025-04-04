import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const MoviesHot = () => {
    return (
        <div className="text-white pt-6">
            <div className="flex flex-col">
                <div className=''>
                    <p className="text-2xl font-bold pt-10 pb-4 container mx-auto px-5 sm:px-5 lg:px-4 xl:px-16">Phim bộ hot</p>
                </div>
                <div className='w-full container mx-auto px-5 sm:px-5 lg:px-4 xl:px-16'>
                    <Swiper
                        slidesPerView={5.2}
                        centeredSlides={false}
                        spaceBetween={10}
                        grabCursor={true}
                        className="mySwiper"
                        breakpoints={{
                            840: {
                                slidesPerView: 5.2,
                            },
                            740: {
                                slidesPerView: 4.2,
                            },
                            540: {
                                slidesPerView: 3.2,
                            },
                            0: {
                                slidesPerView: 2.2,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img
                                        className='w-[207px] h-[310px] rounded-lg object-cover'
                                        src={require('../../asset/images-banner/narutoBanner.webp')}
                                        alt="Naruto Shippuden - Gia Thuận Developer"
                                    />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img
                                        className='w-[207px] h-[310px] rounded-lg object-cover'
                                        src={require('../../asset/images-banner/narutoBanner.webp')}
                                        alt="Naruto Shippuden - Gia Thuận Developer"
                                    />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img
                                        className='w-[207px] h-[310px] rounded-lg object-cover'
                                        src={require('../../asset/images-banner/narutoBanner.webp')}
                                        alt="Naruto Shippuden - Gia Thuận Developer"
                                    />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img
                                        className='w-[207px] h-[310px] rounded-lg object-cover'
                                        src={require('../../asset/images-banner/narutoBanner.webp')}
                                        alt="Naruto Shippuden - Gia Thuận Developer"
                                    />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img
                                        className='w-[207px] h-[310px] rounded-lg object-cover'
                                        src={require('../../asset/images-banner/narutoBanner.webp')}
                                        alt="Naruto Shippuden - Gia Thuận Developer"
                                    />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img
                                        className='w-[207px] h-[310px] rounded-lg object-cover'
                                        src={require('../../asset/images-banner/narutoBanner.webp')}
                                        alt="Naruto Shippuden - Gia Thuận Developer"
                                    />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img
                                        className='w-[207px] h-[310px] rounded-lg object-cover'
                                        src={require('../../asset/images-banner/narutoBanner.webp')}
                                        alt="Naruto Shippuden - Gia Thuận Developer"
                                    />
                                    <p className='pt-3 text-base text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img
                                        className='w-[207px] h-[310px] rounded-lg object-cover'
                                        src={require('../../asset/images-banner/narutoBanner.webp')}
                                        alt="Naruto Shippuden - Gia Thuận Developer"
                                    />
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

export default MoviesHot;