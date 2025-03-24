import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();



  const handleContinue = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/api/send-otp', { email });
    if (isChecked) {
      setStep(2);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/api/verify-otp', { email, otp });
    const { token } = res.data.result
    localStorage.setItem('token', token);
    setTimeout(() => {
      navigate('/')
    }, 500);
  }

  return (
    <div className="w-full min-h-screen bg-black m-0 p-0 flex flex-col">
      <div className="flex items-center ">
        <div className="flex flex-grow justify-center w-16 h-16">
          <img src={require('../asset/image-logo/logoFPT.png')} alt="Logo FPT" />
        </div>

        <a href="/" className="flex justify-center items-center w-9 h-9 bg-white text-black text-xl font-bold rounded-full shadow-md">x</a>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-neutral-800 p-8 rounded-xl shadow-lg w-full max-w-lg">
          {step === 1 && (
            <>
              <h2 className="text-3xl text-white font-bold text-left mb-10">
                Đăng nhập hoặc đăng ký
              </h2>
              <form className="space-y-7" onSubmit={handleContinue}>
                <div className="mb-1">
                  <input
                    type="text"
                    id="sdt"
                    className="w-full p-3 text-neutral-400 border-gray-300 bg-neutral-700 rounded-lg focus:outline-none"
                    placeholder="Nhập gmail của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full  py-3 rounded-lg font-medium focus:outline-none focus:ring focus:ring-orange-300 ${isChecked ? 'bg-orange-600 text-white' : 'bg-neutral-700 text-neutral-400'}`}
                  disabled={!isChecked}
                >
                  Tiếp Tục
                </button>
              </form>
              <div className="mt-4 text-center flex items-center justify-center space-x-2">
                <input
                  type="checkbox"
                  id="check"
                  className="accent-orange-600"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <p className="text-gray-600 text-sm">
                  Tôi đã đọc và đồng ý với{' '}
                  <a href="#" className="text-orange-600">
                    Điều khoản sử dụng của FPT Play
                  </a>
                </p>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-3xl text-white font-bold text-left mb-10">
                Nhập mã xác minh
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Vui lòng kiểm tra email của bạn để nhận mã xác minh.
              </p>
              <form className="space-y-7" onSubmit={handleSubmitOtp}>
                <div className="mb-1">
                  <input
                    type="text"
                    id="code"
                    className="w-full p-3 text-neutral-400 border-gray-300 bg-neutral-700 rounded-lg focus:outline-none"
                    placeholder="Nhập OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-orange-600 py-3 rounded-lg font-medium focus:outline-none focus:ring focus:ring-orange-300"
                >
                  Xác Nhận
                </button>
              </form>
              <p className="text-gray-600 text-sm mt-4">
                Bạn chưa nhận được mã?{' '}
                <a href="#" className="text-orange-600">
                  Gửi lại mã
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
