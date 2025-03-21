import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const NewlyReleased = () => {


    return (
        <div className="text-white">
            <div className="flex flex-col justify-center items-center ">
                <div className=''>
                    <p className="text-2xl font-bold -ms-[575px] pt-10 pb-4">Mới ra mắt</p>
                </div>
                <div className='w-[1150px]'>
                    <Swiper
                        slidesPerView={3.2}
                        centeredSlides={false}
                        spaceBetween={10}
                        grabCursor={true}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-full sm:w-[353px] h-auto sm:h-[199px] rounded-lg object-cover' src={require('../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-lg text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-full sm:w-[353px] h-auto sm:h-[199px] rounded-lg object-cover' src={require('../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-lg text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-full sm:w-[353px] h-auto sm:h-[199px] rounded-lg object-cover' src={require('../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-lg text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-full sm:w-[353px] h-auto sm:h-[199px] rounded-lg object-cover' src={require('../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-lg text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-full sm:w-[353px] h-auto sm:h-[199px] rounded-lg object-cover' src={require('../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-lg text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-full sm:w-[353px] h-auto sm:h-[199px] rounded-lg object-cover' src={require('../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-lg text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-full sm:w-[353px] h-auto sm:h-[199px] rounded-lg object-cover' src={require('../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-lg text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='ps-0'>
                                <a href='#'>
                                    <img className='w-full sm:w-[353px] h-auto sm:h-[199px] rounded-lg object-cover' src={require('../asset/images-banner/narutoBanner.webp')} />
                                    <p className='pt-3 text-lg text-left'>Naruto Shippuden - Gia Thuận Developer</p>
                                </a>
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>
        </div>
    )
}
export default NewlyReleased;