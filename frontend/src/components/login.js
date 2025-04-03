import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../configs/endpoint";
import bgImage from "../asset/image-logo/login-tablet.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(30);
  const [isCounting, setIsCounting] = useState(false);
  const navigate = useNavigate();

  const maskEmail = (email) => {
    const emailParts = email.split('@');
    const maskedEmail = emailParts[0].slice(0, 4) + '****' + '@' + emailParts[1];
    return maskedEmail;
  };

  useEffect(() => {
    if (!isCounting || countdown <= 0) {
      setIsCounting(false);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isCounting]);

  const handleContinue = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API}/send-otp`, { email });
    console.log(res.data);

    if (isChecked) {
      setStep(2);
      setCountdown(30);
      setIsCounting(true);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API}/verify-otp`, { email, otp });

    if (res.data.Data.EC === 0) {
      const { token } = res.data.Data;
      localStorage.setItem("token", token);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      console.log(res.data);
      alert(res.data.Data.Message);
    }
  };

  const handleResend = async () => {
    const res = await axios.post(`${API}/send-otp`, { email });
    console.log(res.data);
    setCountdown(30);
    setIsCounting(true);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur"></div>
      <div className="relative flex items-center">
        <div className="flex flex-grow justify-center">
          <img className="w-56 h-auto -me-10 mt-5" src={require("../asset/image-logo/logoFPT.png")} alt="Logo FPT" />
        </div>
        <a
          href="/"
          className="flex justify-center items-center text-white me-10 text-4xl font-bold rounded-full shadow-md"
        >
          x
        </a>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow mb-28">
        <div className="bg-stone-800 p-8 rounded-xl shadow-lg w-full max-w-lg">
          {step === 1 && (
            <>
              <h2 className="text-3xl text-white font-bold flex items-center justify-center mb-12 text-left ml-7 mt-5">Đăng nhập hoặc đăng ký</h2>
              <form className="space-y-8 mr-8 ml-8" onSubmit={handleContinue}>
                <input
                  type="email"
                  className="w-full p-3 text-neutral-400 bg-neutral-700 rounded-lg"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg font-medium mt-4  ${isChecked ? "bg-orange-600 text-white" : "bg-neutral-700 text-neutral-400"}`}
                  disabled={!isChecked}
                >
                  Tiếp Tục
                </button>
              </form>
              <div className="mt-7 mb-8 ml-4 text-center flex items-center justify-center space-x-2 ">
                <input type="checkbox" id="check" className="accent-orange-600" onChange={(e) => setIsChecked(e.target.checked)} />
                <p className="text-gray-400 font-bold text-sm ">
                  Tôi đã đọc và đồng ý với{" "}
                  <a href="#" className="text-orange-600">
                    <u>Điều khoản sử dụng của FPT Play</u>
                  </a>
                </p>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mr-8 mb-8">
                <h2 className="text-4xl text-white font-bold mb-8 text-left  flex items-center justify-center mt-8 ml-8 ">Xác thực mã OTP</h2>
                <p className="text-gray-400 text-base mb-4 ml-8 text-center ">
                  Nhấn nút <b className="font-base text-center text-white">Gửi Lại</b> nếu bạn không nhận được mã về email: {" "}
                  <span className="font-bold text-white">{email ? maskEmail(email) : "Email chưa được nhập"}</span>.
                </p>

                <form className="space-y-12 ml-8 " onSubmit={handleSubmitOtp}>
                  <div className="flex flex-grow justify-center">
                    <input
                      type="text"
                      className="w-full py-3 text-neutral-400 bg-neutral-700 rounded-lg  text-base pl-5"
                      placeholder="Mã OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <div className="mt-3 w-1/4 ml-1  text-center ">
                      {isCounting ? (
                        <span className="text-base py-3 w-full text-white rounded-lg">
                          Gửi lại {countdown}s
                        </span>
                      ) : (
                        <a
                          href="#"
                          className="text-base py-3 w-full bg-orange-600 text-white rounded-lg"
                          onClick={handleResend}
                        >
                          Gửi lại mã
                        </a>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-4 rounded-lg font-medium   ${otp ? "bg-orange-600 text-white" : "bg-neutral-700 text-neutral-400"}`}
                    disabled={!otp}
                  >
                    Xác nhận
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

