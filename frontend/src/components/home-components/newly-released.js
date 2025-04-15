import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API from '../../configs/endpoint'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';




const NewlyReleased = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMoviesCarousel();
    }, [])

    const getMoviesCarousel = async () => {
        try {
            const res = await axios.get(`${API}/get-all-movies-new`);
            if (res.data.EC === 0) {
                console.log(res.data);
                setMovies(res.data.Data)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="text-white">
            <div className="flex flex-col">
                <div className=''>
                    <p className="text-2xl font-bold pt-10 pb-4 container mx-auto px-5 sm:px-5 lg:px-4 xl:px-16 ">Mới ra mắt</p>
                </div>
                <div className='w-full container mx-auto px-5 sm:px-5 lg:px-4 xl:px-16'>
                    <Swiper
                        slidesPerView={3.2}
                        centeredSlides={false}
                        spaceBetween={10}
                        grabCursor={true}
                        className="mySwiper"
                        breakpoints={{
                            1050: {
                                slidesPerView: 3.2,
                            },
                            900: {
                                slidesPerView: 2.5,
                            },
                            800: {
                                slidesPerView: 2,
                            },
                            700: {
                                slidesPerView: 1.8,
                            },
                            600: {
                                slidesPerView: 1.5,
                            },
                            500: {
                                slidesPerView: 1.5,
                            },
                            0: {
                                slidesPerView: 1,
                            },
                        }}
                    >
                        {movies.map((item, index) => (
                            <SwiperSlide key={index} >
                                <div className='ps-0'>
                                    <a href={`/detail/${item.SlugMovieName}`}>
                                        <img className='w-[353px] h-[199px] rounded-lg object-cover' src={item.MovieImagePath} />
                                        <p className='pt-3 text-lg text-left'>{item.MovieNameVietnamese}</p>
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
export default NewlyReleased;