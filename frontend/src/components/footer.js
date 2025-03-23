import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Về FPT Play</h2>
                        <ul className="space-y-2">
                            <li>Giới thiệu</li>
                            <li>Các gói dịch vụ</li>
                            <li>Liên hệ</li>
                            <li>Trung tâm hỗ trợ</li>
                            <li>Thông tin</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Về FPT Play</h2>
                        <ul className="space-y-2">
                            <li>Giới thiệu</li>
                            <li>Các gói dịch vụ</li>
                            <li>Liên hệ</li>
                            <li>Trung tâm hỗ trợ</li>
                            <li>Thông tin</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Dịch vụ</h2>
                        <ul className="space-y-2">
                            <li>Gói DATA</li>
                            <li>Quảng cáo</li>
                            <li>Mua gói</li>
                            <li>Bảo hành</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Quy định</h2>
                        <ul className="space-y-2">
                            <li>Điều khoản sử dụng</li>
                            <li>Chính sách thanh toán</li>
                            <li>Chính sách bảo mật thông tin dữ liệu</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Liên hệ</h2>
                        <ul className="space-y-2">
                            <li>Số điện thoại: 19006600</li>
                            <li>Email: hotrofptplay@fpt.com</li>
                        </ul>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>


                <div className="text-gray-400 text-sm mt-8">
                    <p className="mb-2">
                        Công ty Cổ phần Viễn Thông FPT - Người đại diện: Ông Hoàng Việt Anh.
                        Trụ sở: Tầng 2, Tòa nhà FPT Cầu Giấy, số 17 Phố Duy Tân, Phường
                        Dịch Vọng Hậu, Quận Cầu Giấy, TP. Hà Nội.
                    </p>
                    <p className="mb-2">
                        Địa chỉ liên hệ: Tầng 9, Block A, tòa nhà FPT Cầu Giấy, số 10 Phạm
                        Văn Bạch, quận Cầu Giấy, TP. Hà Nội.
                    </p>
                    <p className="mb-2">
                        Số điện thoại liên hệ: 024 7300 2222. Thư điện tử:
                        hotrokhachhang@fpt.com hoặc hotrofptplay@fpt.com.
                    </p>
                    <p>
                        Giấy chứng nhận đăng ký doanh nghiệp số 0101778163 do Sở Kế hoạch và
                        Đầu tư Thành phố Hà Nội cấp lần đầu ngày 28/7/2005, cấp đăng ký thay
                        đổi lần thứ 32 vào ngày 21/12/2023.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
