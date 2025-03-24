import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Login = () => {

  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="w-full min-h-screen bg-black m-0 p-0 flex flex-col">
      {/* Header */}
      <div className="flex items-center ">
        {/* Logo */}
        <div className="flex flex-grow justify-center w-16 h-16">
          <img src={require('../asset/image-logo/logoFPT.png')} alt="Logo FPT" />
        </div>
        {/* Close Button */}
        <a href="/" className="flex justify-center items-center w-9 h-9 bg-white text-black text-xl font-bold rounded-full shadow-md">x</a>
      </div>

      {/* Form đăng nhập */}
      <div className="flex items-center justify-center flex-grow ">
        <div className="bg-neutral-800 p-8 rounded-xl shadow-lg w-full  max-w-lg">
          <h2 className="text-3xl text-white font-bold text-left mb-10">
            Đăng nhập hoặc đăng ký
          </h2>
          <form className="space-y-7">
            <div className="mb-1">
              <input
                type="text"
                id="sdt"
                className="w-full p-3 text-neutral-400  border-gray-300 bg-neutral-700 rounded-lg focus:outline-none  "
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full  text-neutral-400 py-3 rounded-lg font-medium focus:outline-none focus:ring focus:ring-orange-300 ${isChecked ? 'bg-orange-600' : 'bg-neutral-700'}`}
              disabled={!isChecked}

            >
              Tiếp Tục
            </button>
          </form>
          <div className="mt-4 text-center flex items-center justify-center space-x-2">
            <input
              type='checkbox'
              id='check'
              className='accent-orange-600'
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <p className="text-gray-600 text-sm">Tôi đã đọc và đồng ý với <a href="#" className='text-orange-600'>Điều khoản sử dụng của FPT Play</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
