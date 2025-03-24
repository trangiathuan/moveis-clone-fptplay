import { useRef, useState, useEffect } from "react";
import { Play, Pause, RotateCcw, RotateCw, Flag, SkipForward, Settings, Minimize2, Maximize2, Subtitles } from "lucide-react";

const Video_comp = () => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [videoDuration, setVideoDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // Định dạng thời gian hiển thị
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Toggle Play/Pause khi click vào video
    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setPlaying(true);
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }
    };

    // Tua nhanh hoặc lùi lại
    const skipTime = (seconds) => {
        videoRef.current.currentTime += seconds;
    };

    // Toggle Fullscreen
    const toggleFullscreen = () => {
        if (!fullscreen) {
            videoRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setFullscreen(!fullscreen);
    };

    // Cập nhật tiến trình video
    const updateProgress = () => {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
        setCurrentTime(videoRef.current.currentTime);
    };

    // Cập nhật thời lượng video khi load
    const handleLoadedMetadata = () => {
        setVideoDuration(videoRef.current.duration);
    };

    // Thay đổi tốc độ phát
    const changePlaybackSpeed = (speed) => {
        videoRef.current.playbackRate = speed;
        setPlaybackSpeed(speed);
    };

    // Ẩn thanh công cụ sau 3s nếu không có tương tác
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowControls(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [showControls]);

    return (
        <div 
            className="relative w-full max-w-5xl mx-auto"
            onMouseMove={() => setShowControls(true)}
        >
            {/* Video Player */}
            <video 
                ref={videoRef} 
                className="w-full rounded-lg cursor-pointer"
                src="https://res.cloudinary.com/dkp3rw6p8/video/upload/v1742749049/9convert.com_-_TH%E1%BA%A6Y_BA_CH%C3%9AC_M%E1%BB%AANG_SINH_NH%E1%BA%ACT_2023_PH%E1%BA%A6N_2_filcqc.mp4"
                controls={false} 
                onTimeUpdate={updateProgress}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
            ></video>
            {/* Thanh công cụ (Tự ẩn sau 3s) */}
            <div className={`absolute bottom-2 left-2 right-2 flex items-center justify-between p-2 bg-opacity-50 rounded-lg transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Thanh Timeline & Thời lượng */}
                <div className="absolute bottom-[42px] left-0 w-full flex items-center px-2">
                    {/* Thời lượng Video */}
                    <span className="text-white text-xs">{formatTime(currentTime)}</span>
                    {/* Thanh Timeline (Có thể Click để tua) */}
                    <div 
                        className="flex-1 h-1 bg-gray-500 rounded overflow-hidden mx-2 relative cursor-pointer"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const newTime = (clickX / rect.width) * videoRef.current.duration;
                            videoRef.current.currentTime = newTime;
                            setProgress((newTime / videoRef.current.duration) * 100);
                        }}
                    >
                        <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button onClick={togglePlay} className="text-white">{playing ? <Pause /> : <Play />}</button>
                    <button onClick={() => skipTime(-10)} className="text-white"><RotateCcw /></button>
                    <button onClick={() => skipTime(10)} className="text-white"><RotateCw /></button>
                </div>
                <div className="flex space-x-2 relative">
                    <button className="text-white"><Flag /></button>
                    <button className="text-white"><SkipForward /></button>
                    <button className="text-white"><Subtitles /></button>
                    <button onClick={() => setShowSettings(!showSettings)} className="text-white relative"><Settings /></button>
                    {showSettings && (
                        <div className="absolute bottom-10 right-0 bg-gray-800 p-2 rounded shadow-lg">
                            {[0.75, 1, 1.25, 2, 3, 5].map((speed) => (
                                <button key={speed} onClick={() => changePlaybackSpeed(speed)} className={`block text-white px-2 py-1 ${playbackSpeed === speed ? 'bg-blue-500' : ''}`}>{speed}x</button>
                            ))}
                        </div>
                    )}
                    <button onClick={toggleFullscreen} className="text-white">{fullscreen ? <Minimize2 /> : <Maximize2 />}</button>
                </div>
            </div>
        </div>
    );
};

export default Video_comp;
