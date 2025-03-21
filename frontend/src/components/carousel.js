import React, { useState } from 'react';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        "https://cdn.shopify.com/s/files/1/0765/7740/7287/files/naruto_en_mainbnr.jpg?v=1705547960/800x300/FF7F7F/333333?text=Slide+1",
        "https://cdn.shopify.com/s/files/1/0765/7740/7287/files/naruto_en_mainbnr.jpg?v=1705547960/800x300/7FFFD4/333333?text=Slide+2",
        "https://cdn.shopify.com/s/files/1/0765/7740/7287/files/naruto_en_mainbnr.jpg?v=1705547960/800x300/FF7F50/333333?text=Slide+3"
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
                    {slides.map((slide, index) => (
                        <div key={index} className="w-full flex-shrink-0 relative">
                            {/* Apply the image */}
                            <img
                                src={slide}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-[600px] object-cover rounded-lg object-cover"
                            />
                            {/* Gradient overlay on each slide */}
                            <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t from-black to-transparent rounded-lg opacity-100"></div>
                            <div className='absolute z-9 ps-10 -mt-52'>
                                <div className='text-white pb-1'>
                                    <p className='text-3xl font-bold'>Naruto Shippuden - Gia Thuận Developer</p>
                                </div>
                                <div className='flec text-white pb-6'>
                                    <span>2025</span>
                                    <span className='ms-4 text-stone-400'>•</span>
                                    <span className='ms-4'>40/40 tập</span>
                                    <span className='ms-4 text-stone-400'>•</span>
                                    <span className='ms-4'>Nhật Bản</span>
                                </div>
                                <div className='flex'>
                                    <button className='flex bg-orange-600 w-48 h-12 rounded-lg text-white text-lg '>
                                        <img className='w-5 h-5 mt-3 ms-10 ' src={require('../asset/image-logo/play.png')} />
                                        <span className='ms-3 mt-2 font-bold'>Xem ngay</span>
                                    </button>
                                    <button className='flex ms-5 mt-0 bg-neutral-800 w-12 h-12 rounded-full text-white text-lg '>
                                        <img className='w-6 h-5 ms-3 mt-4' src={require('../asset/image-logo/heart.png')} />
                                    </button>
                                    <button className='flex ms-5 mt-0 bg-neutral-800 w-12 h-12 rounded-full text-white text-lg '>
                                        <img className='w-8 h-8 ms-2 mt-2' src={require('../asset/image-logo/share.png')} />
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>


            </div>

            {/* Previous Button */}
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

            {/* Next Button */}
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
