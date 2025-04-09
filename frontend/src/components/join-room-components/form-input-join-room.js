import axios from "axios";
import { useState } from "react";
import API from "../../configs/endpoint";
import { Dot } from "lucide-react";

const FormInput = () => {
    const [roomId, setRoomId] = useState("");
    const [room, setRoom] = useState({});
    const [checkResult, setCheckResult] = useState(false);
    const [isSearched, setIsSearched] = useState(false);

    console.log(room);


    const handleFindRomm = async () => {
        setIsSearched(true);
        const result = await axios.post(`${API}/getMovieRoom`, { roomId });
        if (result.data.EC === 0) {
            setRoom(result.data.Data[0]);
            setCheckResult(true);
        } else {
            setCheckResult(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleFindRomm();
        }
    };

    return (
        <div className="pt-48 min-h-screen">
            <div className="flex justify-center space-x-5">
                <input
                    type="text"
                    placeholder="Nhập mã phòng..."
                    className="text-zinc-400 placeholder-zinc-500 border border-zinc-700 rounded-lg h-14 w-80 p-2 bg-zinc-900 
                    focus:outline-none focus:border-2 focus:border-orange-900"
                    onKeyDown={handleKeyDown}
                    value={roomId}
                    onChange={(e) => { setRoomId(e.target.value); setIsSearched(false) }}

                />
                <button
                    className="bg-orange-700 w-20 rounded-lg text-white hover:bg-orange-800"
                    onClick={handleFindRomm}
                >
                    Tìm
                </button>
            </div>

            {isSearched && checkResult && (
                <div className="flex justify-center space-x-5 pt-6">
                    <div className="flex border border-zinc-700 text-zinc-500 p-2 w-[420px] h-14 items-center justify-center rounded-lg bg-zinc-900 space-x-1 font-semibold">
                        <span>Phòng: </span>
                        <span className="text-red-500 ps-2">{roomId}</span>
                        <span className="ps-7">Đang hoạt động</span>
                        <span><Dot className="w-12 h-10 text-green-700" /></span>
                        <a href={`/streaming/${room.SlugMovieName.trim()}/${room.SlugEpisode.trim()}/${room.roomId}`}>
                            <button className="text-white bg-green-800 w-20 h-10 rounded-lg hover:bg-green-900">
                                Tham gia
                            </button>
                        </a>
                    </div>
                </div>
            )}

            {isSearched && !checkResult && (
                <div className="flex justify-center space-x-5 pt-6">
                    <div className="flex border border-zinc-700 text-zinc-500 p-2 w-[420px] h-14 items-center justify-center rounded-lg bg-zinc-900 space-x-1 font-semibold">
                        <span>Phòng: </span>
                        <span className="text-red-500 ps-2">{roomId}</span>
                        <span className="ps-7">Không tồn tại</span>
                        <span><Dot className="w-12 h-10 text-red-700" /></span>
                        <button
                            className="text-white bg-gray-800 w-20 h-10 rounded-lg cursor-not-allowed opacity-50"
                            disabled
                        >
                            Tham gia
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormInput;
