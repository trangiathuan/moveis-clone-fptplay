import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Login = () => {
  return (
    <div className="w-full min-h-screen bg-black m-0 p-0 flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 pt-3 pb-0 relative">
        {/* Logo */}
        <div className="flex-grow flex justify-center">
          <img className="w-32" src={require('../asset/image-logo/logoFPT.png')} alt="Logo FPT" />
        </div>
        {/* Close Button */}
        <a href="#" className="text-white text-lg font-bold">
          x
        </a>
      </div>

      {/* Form đăng nhập */}
      <div className="flex items-center justify-center flex-grow ">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl text-black font-bold text-center mb-4">
            Đăng nhập hoặc đăng ký
          </h2>
          <form className="space-y-7">
            <div className="mb-1">
              <input
                type="text"
                id="sdt"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium focus:outline-none focus:ring focus:ring-orange-300"
            >
              Tiếp Tục
            </button>
          </form>
          <div className="mt-4 text-center flex items-center justify-center space-x-2">
            <input type="checkbox" id="check" className="w-4 h-4" />
            <p className="text-gray-600 text-sm">
              Tôi đã đọc và đồng ý với{' '}
              <a href="#" className="text-orange-600">
                Điều khoản sử dụng của FPT Play
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
