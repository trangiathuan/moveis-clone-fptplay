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
            <div className="flex flex-col justify-center items-center ">
                <div className=''>
                    <p className="text-2xl font-bold -ms-[575px] pt-10 pb-4">Mới ra mắt</p>
                </div>
                <div className='w-full'>
                    <Swiper
                        slidesPerView={3.2}
                        centeredSlides={false}
                        spaceBetween={10}
                        grabCursor={true}
                        className="mySwiper"
                        breakpoints={{
                            840: {
                                slidesPerView: 3.2, // Từ 640px trở lên, hiển thị 3.2 slides
                            },
                            640: {
                                slidesPerView: 2.2, // Từ 640px trở lên, hiển thị 3.2 slides
                            },
                            0: {
                                slidesPerView: 1, // Dưới 640px, hiển thị 1 slide
                            },
                        }}
                    >
                        {movies.map((item, index) => (
                            <SwiperSlide>
                                <div key={index} className='ps-0'>
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