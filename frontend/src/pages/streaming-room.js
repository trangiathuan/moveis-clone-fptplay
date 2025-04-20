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
    const [movideData, setMovieData] = useState([])
    const [videoSrc, setVideoSrc] = useState([])
    const [room, setRoom] = useState({});
    const emailHost = room.host;
    const isHost = host === emailHost

    useEffect(() => {
        createMovieRoom();
        deleteMovieRoom();
        fetchMovieData();
        getMovieRoom();
    }, [])


    const getMovieRoom = async () => {
        const result = await axios.post(`${API}/getMovieRoom`, { roomId });
        if (result.data.EC === 0) {
            setRoom(result.data.Data[0]);
        } else {
        }
    }

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

    const fetchMovieData = async () => {
        try {
            const episode = slugEpisode || "tap-1";
            const result = await axios.get(
                `${API}/get-by-slugMovieName/${slugMovieName}/${episode}`
            );
            if (result.data.EC === 0) {
                console.log(result.data);
                setMovieData(result.data.Data[0]);
                setVideoSrc(result.data.Data[0].MovieFilePath);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    return (
        <div className="bg-black overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            <div className="pt-24">
                <div className="block xl:flex max-w-7xl mx-auto md:px-24 sm:px-8 px-2 xl:px-10 xl:space-x-2 space-x-0">
                    <VideoStreaming videoSrc={videoSrc} isHost={isHost} />
                    <ChatsStreaming />
                </div>
            </div>
            <div className="lg:flex block justify-between xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[600px] xl:mx-auto md:mx-28 sm:mx-8 mx-5 sm:max-w-[550px]">
                <div>
                    <InfMovie movideData={movideData} />
                </div>
                <div>
                    {/* <RoomMembers /> */}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
export default StreamingRoom;