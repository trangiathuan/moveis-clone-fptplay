import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../configs/endpoint";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(30);
  const [isCounting, setIsCounting] = useState(false); // Chỉ chạy khi bấm "Gửi lại mã"
  const navigate = useNavigate();

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
      alert(res.data.Data.Message)
    }
  };

  const handleResend = async () => {
    const res = await axios.post(`${API}/send-otp`, { email });
    console.log(res.data);
    setCountdown(30);
    setIsCounting(true);
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col">
      <div className="flex items-center">
        <div className="flex flex-grow justify-center w-16 h-16">
          <img src={require("../asset/image-logo/logoFPT.png")} alt="Logo FPT" />
        </div>
        <a
          href="/"
          className="flex justify-center items-center w-9 h-9 text-white text-black pe-8 text-4xl font-bold rounded-full shadow-md"
        >
          x
        </a>
      </div>

      <div className="flex items-center justify-center flex-grow">
        <div className="bg-neutral-800 p-8 rounded-xl shadow-lg w-full max-w-lg">
          {step === 1 && (
            <>
              <h2 className="text-3xl text-white font-bold mb-10 text-center">Đăng nhập hoặc đăng ký</h2>
              <form className="space-y-7" onSubmit={handleContinue}>
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
                  className={`w-full py-3 rounded-lg font-medium ${isChecked ? "bg-orange-600 text-white" : "bg-neutral-700 text-neutral-400"
                    }`}
                  disabled={!isChecked}
                >
                  Tiếp Tục
                </button>
              </form>
              <div className="mt-4 text-center flex items-center justify-center space-x-2">
                <input type="checkbox" id="check" className="accent-orange-600" onChange={(e) => setIsChecked(e.target.checked)} />
                <p className="text-gray-600 text-sm">
                  Tôi đã đọc và đồng ý với{" "}
                  <a href="#" className="text-orange-600">
                    Điều khoản sử dụng của FPT Play
                  </a>
                </p>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-3xl text-white font-bold mb-10 text-center">Nhập mã OTP</h2>
              <p className="text-gray-400 text-sm mb-4">Vui lòng kiểm tra email của bạn để nhận mã OTP</p>
              <form className="space-y-7" onSubmit={handleSubmitOtp}>
                <input
                  type="text"
                  className="w-full p-3 text-neutral-400 bg-neutral-700 rounded-lg"
                  placeholder="Nhập OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="submit" className="w-full text-white bg-orange-600 py-3 rounded-lg font-medium">
                  Xác Nhận
                </button>
              </form>

              <div className="mt-4 text-center">
                {isCounting ? (
                  <span className="text-gray-500">Gửi lại mã sau {countdown}s</span>
                ) : (
                  <a href="#" className="text-orange-600" onClick={handleResend}>
                    Gửi lại mã
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
