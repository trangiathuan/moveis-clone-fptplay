import Navbar from "../components/public-components/navbar";
import Footer from "../components/public-components/footer";
import Video from "../components/public-components/video";
import ChatsStreaming from "../components/streaming-room-components/chats-streaming";
import RoomMembers from "../components/streaming-room-components/room-members";
import InfMovie from "../components/streaming-room-components/inf-movie";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../configs/endpoint";
import VideoStreaming from "../components/streaming-room-components/video-streaming";
import { jwtDecode } from "jwt-decode";

const StreamingRoom = () => {
    const { slugMovieName, slugEpisode, roomId } = useParams()
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const host = decoded.email

    useEffect(() => {
        createMovieRoom();
        deleteMovieRoom();
    }, [])

    const createMovieRoom = async () => {
        const result = await axios.post(`${API}/createMovieRoom/${slugMovieName}/${slugEpisode}/${roomId}`, { host })
        if (result.data.EC === 0) {
            console.log(result.data.Message);
        } else {
            console.log('Tạo phòng xem phim không thành công');
        }
    }
    const deleteMovieRoom = async () => {
        const result = await axios.post(`${API}/deleteMovieRoom`)
        if (result.data.EC === 0) {
            console.log(result.data.Message);
        }
    }


    const videoSrc = 'https://res.cloudinary.com/dteuqunrm/video/upload/v1743780230/shin-cau-be-but-chi-tap-1_x6wkhr.webm'
    return (
        <div className="bg-black overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            <div className="pt-24">
                <div className="block xl:flex max-w-7xl mx-auto md:px-24 sm:px-8 px-2 xl:px-10 xl:space-x-2 space-x-0">
                    <VideoStreaming videoSrc={videoSrc} />
                    <ChatsStreaming />
                </div>
            </div>
            <div className="lg:flex block justify-between xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[600px] xl:mx-auto md:mx-28 sm:mx-8 mx-5 sm:max-w-[550px]">
                <div>
                    <InfMovie />
                </div>
                <div>
                    <RoomMembers />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
export default StreamingRoom;