import Footer from "../components/footer";
import Navbar from "../components/navbar"

const FollowingMoviesList = () => {
    return (
        <div className="bg-black ">
            <div>
                <Navbar />
            </div>
            <div className="text-white ms-40 pt-24 text-xl font-bold">
                Phim đang theo dõi
            </div>
            <div className="grid grid-cols-2 gap-10 pt-5 mx-40 justify-items-center ">

                <div className="flex p-4 pb-4 w-[570px] items-center pb-0 bg-zinc-800 inline-flex rounded-lg">
                    <div className="ps-3">
                        <img className="w-[170px] h-[170px] object-cover rounded-lg flex-shrink-0" src={require('../asset/images-banner/narutoBanner.webp')} />
                    </div>
                    <div className=" text-white p-4">
                        <p className="text-lg font-bold ">Bẩy viên ngọc rồng - Dragon ball </p>
                        <p className="mt-1">Tập: 52/52 </p>
                        <p className="mt-1">Năm: 2002</p>
                        <p className="mt-1">Quốc gia: Nhật Bản</p>
                        <div className="flex gap-x-2 mt-5">
                            <a href="#">
                                <button className="w-24 h-8 bg-orange-700 rounded-lg hover:bg-orange-600">Xem phim</button>
                            </a>
                            <a href="#">
                                <button className="w-24 h-8 bg-red-700 rounded-lg hover:bg-red-600">Bỏ theo dõi</button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex p-4 pb-4 w-[570px] items-center pb-0 bg-zinc-800 inline-flex rounded-lg">
                    <div className="ps-3">
                        <img className="w-[170px] h-[170px] object-cover rounded-lg flex-shrink-0" src={require('../asset/images-banner/narutoBanner.webp')} />
                    </div>
                    <div className=" text-white p-4">
                        <p className="text-lg font-bold ">Bẩy viên ngọc rồng - Dragon ball </p>
                        <p className="mt-1">Tập: 52/52 </p>
                        <p className="mt-1">Năm: 2002</p>
                        <p className="mt-1">Quốc gia: Nhật Bản</p>
                        <div className="flex gap-x-2 mt-5">
                            <a href="#">
                                <button className="w-24 h-8 bg-orange-700 rounded-lg hover:bg-orange-600">Xem phim</button>
                            </a>
                            <a href="#">
                                <button className="w-24 h-8 bg-red-700 rounded-lg hover:bg-red-600">Bỏ theo dõi</button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex p-4 pb-4 w-[570px] items-center pb-0 bg-zinc-800 inline-flex rounded-lg">
                    <div className="ps-3">
                        <img className="w-[170px] h-[170px] object-cover rounded-lg flex-shrink-0" src={require('../asset/images-banner/narutoBanner.webp')} />
                    </div>
                    <div className=" text-white p-4">
                        <p className="text-lg font-bold ">Bẩy viên ngọc rồng - Dragon ball </p>
                        <p className="mt-1">Tập: 52/52 </p>
                        <p className="mt-1">Năm: 2002</p>
                        <p className="mt-1">Quốc gia: Nhật Bản</p>
                        <div className="flex gap-x-2 mt-5">
                            <a href="#">
                                <button className="w-24 h-8 bg-orange-700 rounded-lg hover:bg-orange-600">Xem phim</button>
                            </a>
                            <a href="#">
                                <button className="w-24 h-8 bg-red-700 rounded-lg hover:bg-red-600">Bỏ theo dõi</button>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex p-4 pb-4 w-[570px] items-center pb-0 bg-zinc-800 inline-flex rounded-lg">
                    <div className="ps-3">
                        <img className="w-[170px] h-[170px] object-cover rounded-lg flex-shrink-0" src={require('../asset/images-banner/narutoBanner.webp')} />
                    </div>
                    <div className=" text-white p-4">
                        <p className="text-lg font-bold ">Bẩy viên ngọc rồng - Dragon ball </p>
                        <p className="mt-1">Tập: 52/52 </p>
                        <p className="mt-1">Năm: 2002</p>
                        <p className="mt-1">Quốc gia: Nhật Bản</p>
                        <div className="flex gap-x-2 mt-5">
                            <a href="#">
                                <button className="w-24 h-8 bg-orange-700 rounded-lg hover:bg-orange-600">Xem phim</button>
                            </a>
                            <a href="#">
                                <button className="w-24 h-8 bg-red-700 rounded-lg hover:bg-red-600">Bỏ theo dõi</button>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}
export default FollowingMoviesList;