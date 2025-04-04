import { useEffect, useState } from "react";
import Footer from "../components/public-component/footer";
import Navbar from "../components/public-component/navbar"
import axios from 'axios'
import API from "../configs/endpoint";

const FollowingMoviesList = () => {
    const [followingList, setFollowingList] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        getFollowingList()
    }, [])

    const getFollowingList = async () => {
        const res = await axios.get(`${API}/getFollowingMoviesList`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.EC === 0) {
            setFollowingList(res.data.Data)
        }
    }

    const handleUnFollow = async (movieID) => {
        const res = await axios.get(`${API}/toggleFollowMovie/${movieID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.data.EC === 0) {
            getFollowingList()
            console.log(res.data);
        }
        else {
            console.log('Bỏ theo dõi thất bại');
        }
    }

    return (
        <div className="bg-black overflow-x-hidden">
            <div>
                <Navbar />
            </div>

            {followingList ?
                (
                    <div>
                        <div className="text-white ms-10 sm:ms-28 lg:ms-40 xl:ms-40 pt-24 text-xl font-bold">
                            Phim đang theo dõi
                        </div>
                        <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-10 pt-5 mx-40 justify-items-center ">

                            {followingList.map((item, index) => (
                                <div key={index} className=" p-4 pb-4 sm:w-64 lg:w-[370px] xl:w-[95%] items-center pb-0 bg-zinc-800 sm:block  lg:inline-flex xl:inline-flex  rounded-lg">
                                    <div className="ps-3">
                                        <img className="w-[205px] h-[205px] xl:w-[170px] xl:h-[170px] lg:w-[170px] lg:h-[170px] sm:w-[205px] sm:h-[205px] object-cover rounded-lg flex-shrink-0"
                                            src={item.MovieImagePath} />
                                    </div>
                                    <div className=" text-white p-4">
                                        <p className="text-lg font-bold ">{item.MovieNameVietnamese}</p>
                                        <p className="mt-1">Tập: {item.NumberOfEpisodes.replace("tập", "")} </p>
                                        <p className="mt-1">Năm: {item.ReleaseYear}</p>
                                        <p className="mt-1">Quốc gia: {item.Country}</p>
                                        <div className="flex gap-x-2 mt-5">
                                            <a href={`/detail/${item.SlugMovieName}`}>
                                                <button className="w-24 h-8 bg-orange-700 rounded-lg hover:bg-orange-600">Xem phim</button>
                                            </a>
                                            <button onClick={() => (handleUnFollow(item.SlugMovieName))} className="w-24 h-8 bg-red-700 rounded-lg hover:bg-red-600">Bỏ theo dõi</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>

                        <div className="flex text-white h-80 justify-center p-56">
                            <p className="text-stone-400">Bạn chưa theo dõi phim nào</p>
                        </div>
                    </div>
                )

            }


            <div>
                <Footer />
            </div>
        </div >
    )
}
export default FollowingMoviesList;