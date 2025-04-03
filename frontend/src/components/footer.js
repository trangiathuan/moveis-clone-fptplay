import React from "react";

const Footer = () => {
    return (
        <footer className=" pt-6 container mx-auto pb-6 mt-8 xl:px-16 lg:px-10 px-5 ">
            <div className="flex flex-col justify-center items-center">
                <div className="grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-5 lg:grid-cols-6 border-t border-b border-gray-700 pt-6 pb-6 mt-15">
                    <div className="hidden xl:flex lg:hidden">
                        <ul className="space-y-3">
                            <li className="w-1/2">
                                <a href="/">
                                    <img src={require('../asset/image-logo/logoFPT.png')} alt="Logo FPT" />
                                </a>
                            </li>
                            <li className="w-1/2">
                                <a href="/">
                                    <img src={require('../asset/image-logo/footer.png')} alt="Footer Logo" />
                                </a>
                            </li>
                            <li className="w-1/2 pt-3">
                                <a href="/">
                                    <img src={require('../asset/image-logo/footer2.png')} alt="Footer Logo 2" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-40">
                        <h2 className="text-xs font-semibold mb-4 text-gray-400">Về FPT Play</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Giới thiệu</a></li>
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Các gói dịch vụ</a></li>
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Liên hệ</a></li>
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Trung tâm hỗ trợ</a></li>
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Thông tin</a></li>
                        </ul>
                    </div>
                    <div className="w-40">
                        <h2 className="text-xs font-semibold mb-4 text-gray-400">Dịch vụ</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Gói DATA</a></li>
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Quảng cáo</a></li>
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Mua gói</a></li>
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Bảo hành</a></li>
                        </ul>
                    </div>
                    <div className="w-40">
                        <h2 className="text-xs font-semibold mb-4 text-gray-400">Quy định</h2>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Điều khoản sử dụng</a></li>
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Chính sách thanh toán</a></li>
                            <li><a href="/" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">Chính sách bảo mật thông tin dữ liệu</a></li>
                        </ul>
                    </div>
                    <div className="w-40 pt-5 sm:ms-14 sm:pt-0 lg:ms-0">
                        <h2 className="text-xs font-semibold mb-4 text-gray-400">Liên hệ</h2>
                        <ul className="space-y-2 text-sm">
                            <li className="text-white">Số điện thoại: <a href="tel:19006600" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">19006600</a></li>
                            <li className="text-white">Email: <a href="mailto:hotrofptplay@fpt.com" className="text-white active:text-red-500 focus:text-red-500 hover:text-red-500">hotrofptplay@fpt.com</a></li>
                        </ul>
                        <div className="flex space-x-4 mt-4">
                            {/* Facebook Icon */}
                            <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.482v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.894-4.787 4.659-4.787 1.325 0 2.463.099 2.795.143v3.24h-1.917c-1.505 0-1.796.715-1.796 1.763v2.312h3.59l-.467 3.622h-3.123v9.294h6.116c.733 0 1.325-.591 1.325-1.324v-21.351c0-.733-.592-1.325-1.325-1.325z" />
                                </svg>
                            </a>

                            {/* YouTube Icon */}
                            <a href="https://youtube.com" aria-label="YouTube" className="text-gray-400 hover:text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19.615 3.184c-1.232-.491-5.84-.492-5.84-.492s-4.609.001-5.841.492c-1.232.491-2.155 2.025-2.155 2.025s-.49 3.767-.49 7.563v1.5c0 3.796.49 7.563.49 7.563s.923 1.534 2.155 2.025c1.232.491 5.841.492 5.841.492s4.608-.001 5.84-.492c1.233-.491 2.156-2.025 2.156-2.025s.491-3.767.491-7.563v-1.5c0-3.796-.491-7.563-.491-7.563s-.923-1.534-2.156-2.025zm-10.115 13.316v-8l6 4-6 4z" />
                                </svg>
                            </a>
                        </div>

                    </div>
                </div>


            </div>
            <div className="text-gray-200 text-sm mt-8 px-0">
                <p className="mb-2 text-left">
                    Công ty Cổ phần Viễn Thông FPT - Người đại diện: Ông Hoàng Việt Anh.
                    Trụ sở: Tầng 2, Tòa nhà FPT Cầu Giấy, số 17 Phố Duy Tân, Phường
                    Dịch Vọng Hậu, Quận Cầu Giấy, TP. Hà Nội.
                </p>
                <p className="mb-2">
                    Địa chỉ liên hệ: Tầng 9, Block A, tòa nhà FPT Cầu Giấy, số 10 Phạm
                    Văn Bạch, quận Cầu Giấy, TP. Hà Nội.
                </p>
                <p className="mb-2">
                    Số điện thoại liên hệ:
                    <a href="tel:02473002222" className="active:text-red-500 focus:text-red-500 hover:text-red-500">024 7300 2222</a>.
                    Thư điện tử:
                    <a href="mailto:hotrokhachhang@fpt.com" className="active:text-red-500 focus:text-red-500 hover:text-red-500">hotrokhachhang@fpt.com</a>
                    hoặc
                    <a href="mailto:hotrofptplay@fpt.com" className="active:text-red-500 focus:text-red-500 hover:text-red-500">hotrofptplay@fpt.com</a>.
                </p>
                <p>
                    Giấy chứng nhận đăng ký doanh nghiệp số 0101778163 do Sở Kế hoạch và
                    Đầu tư Thành phố Hà Nội cấp lần đầu ngày 28/7/2005, cấp đăng ký thay
                    đổi lần thứ 32 vào ngày 21/12/2023.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
