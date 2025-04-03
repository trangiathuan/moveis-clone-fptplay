import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API from '../../configs/endpoint'

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMoviesCarousel();
    }, [])

    useEffect(() => {
        if (movies.length === 0) return; // Chỉ chạy khi có dữ liệu

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % movies.length);
        }, 3500); // 2 giây

        return () => clearInterval(interval);
    }, [currentSlide, movies.length]); // Lắng nghe sự thay đổi của `currentSlide`


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


    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % movies.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto mt-10 z-10">
            {/* Carousel container */}
            <div className="relative w-full overflow-hidden rounded-lg">
                {/* Slide track */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {movies.map((item, index) => (
                        <div key={index} className="w-full flex-shrink-0 relative">
                            {/* Apply the image */}
                            <img
                                src={item.MovieImagePath}
                                alt={`Slide ${index + 1}`}
                                className="w-full xl:h-[600px] lg:h-[500px] sm:h-[450px] h-[350px] rounded-lg object-cover"
                            />
                            {/* Gradient overlay on each slide */}
                            <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-black to-transparent rounded-lg opacity-100"></div>
                            <div className='absolute z-9 sm:ps-10 sm:-mt-52 ps-10 -mt-32'>
                                <div className='text-white pb-1'>
                                    <p className='xl:text-3xl lg:text-2xl sm:text-2xl text-xl font-bold'>{item.MovieNameVietnamese}</p>
                                </div>
                                <div className='flex text-white sm:pb-6 pb-4'>
                                    <span>{item.ReleaseYear}</span>
                                    {item.AgeRestriction && (
                                        <>
                                            <span className='ms-4 text-stone-400'>•</span>
                                            <span className='ms-4'>{item.AgeRestriction}</span>
                                        </>
                                    )}
                                    <span className='ms-4 text-stone-400'>•</span>
                                    <span className='ms-4'>{item.NumberOfEpisodes}</span>
                                    <span className='ms-4 text-stone-400'>•</span>
                                    <span className='ms-4'>{item.Country}</span>
                                </div>
                                <div className='flex'>
                                    <a href={`/detail/${item.SlugMovieName}`}>
                                        <button className='flex bg-orange-600 sm:w-44 sm:h-12 w-36 h-10 rounded-lg text-white text-lg '>
                                            <img className='sm:w-5 sm:h-5 sm:mt-[14px] sm:ms-8 w-5 h-5 mt-[10px] ms-4' src={require('../../asset/image-logo/play.png')} />
                                            <span className='sm:ms-3 sm:mt-[10px] font-bold sm:ps-0 ps-3 mt-[6px]'>Xem ngay</span>
                                        </button>
                                    </a>
                                    <button className='flex ms-5 bg-neutral-800 sm:w-12 sm:h-12 w-10 h-10 rounded-full text-white text-lg '>
                                        <img className='sm:w-6 sm:h-5 sm:ms-3 sm:mt-4 w-6 h-6 ms-2 mt-[10px]' src={require('../../asset/image-logo/heart.png')} />
                                    </button>
                                    <button className='flex ms-4 bg-neutral-800 sm:w-12 sm:h-12 w-10 h-10 rounded-full text-white text-lg '>
                                        <img className='sm:w-8 sm:h-8 sm:ms-2 sm:mt-2 w-8 h-8 ms-1 mt-[3px]' src={require('../../asset/image-logo/share.png')} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 text-neutral-400 hover:text-white  p-2 rounded-full z-20"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-12 h-12"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-neutral-400 hover:text-white p-2 rounded-full z-20"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-12 h-12"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Carousel;
