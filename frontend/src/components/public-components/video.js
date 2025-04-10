import { Play, Pause, RotateCcw, RotateCw, Flag, SkipForward, Settings, Minimize2, Maximize2, Subtitles, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Video = ({ videoSrc }) => {
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [fullscreen, setFullscreen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowControls(false);
        }, 1200);
        return () => clearTimeout(timeout);
    }, [showControls]);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setPlaying(true);
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const updateProgress = () => {
        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setVideoDuration(videoRef.current.duration);
    };

    const skipTime = (seconds) => {
        videoRef.current.currentTime += seconds;
    };

    const toggleMute = () => {
        setMuted(!muted);
        videoRef.current.muted = !muted;
    };

    const changeVolume = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
        setMuted(newVolume === 0);
    };

    const changePlaybackSpeed = (speed) => {
        videoRef.current.playbackRate = speed;
        setPlaybackSpeed(speed);
    };

    const toggleFullscreen = () => {
        const elem = containerRef.current;

        if (!document.fullscreenElement) {
            elem?.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }

        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    return (
        <div className="relative w-full max-w-7xl mx-auto">
            <div className="flex mx-auto space-x-4">
                <div
                    ref={containerRef}
                    className="relative mx-auto w-full max-h-[700px] max-w-[1110px] rounded-lg overflow-hidden"
                    onMouseMove={() => setShowControls(true)}
                >
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        className="w-full h-auto max-h-[870px] cursor-pointer rounded-lg"
                        controls={false}
                        onTimeUpdate={updateProgress}
                        onLoadedMetadata={handleLoadedMetadata}
                        onClick={togglePlay}
                    />

                    <span className={`absolute bottom-[50px] left-4 text-white text-xs px-2 rounded transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                        {formatTime(currentTime)}
                    </span>

                    <div
                        className={`absolute bottom-[55px] left-16 right-4 h-1 bg-white/40 rounded-full cursor-pointer transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const newTime = (clickX / rect.width) * videoRef.current.duration;
                            videoRef.current.currentTime = newTime;
                            setProgress((newTime / videoRef.current.duration) * 100);
                        }}
                    >
                        <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className={`absolute bottom-3 left-0 right-0 px-4 flex items-center justify-between transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex items-center space-x-4 text-white">
                            <button onClick={togglePlay} className="hover:text-orange-500">
                                {playing ? <Pause /> : <Play />}
                            </button>
                            <button onClick={() => skipTime(-10)} className="hover:text-orange-500"><RotateCcw /></button>
                            <button onClick={() => skipTime(10)} className="hover:text-orange-500"><RotateCw /></button>
                            <button onClick={toggleMute} className="hover:text-orange-500">
                                {muted || volume === 0 ? <VolumeX /> : <Volume2 />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={changeVolume}
                                className="w-10 sm:w-20 h-1 cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center space-x-4 text-white relative">
                            <button className="hover:text-orange-500"><Subtitles /></button>
                            <button className="hover:text-orange-500"><SkipForward /></button>
                            <button onClick={() => setShowSettings(!showSettings)} className="hover:text-orange-500"><Settings /></button>
                            {showSettings && (
                                <div className="absolute bottom-10 right-0 bg-gray-800 p-2 rounded shadow-lg space-y-1 z-10">
                                    {[0.75, 1, 1.25, 2, 3, 5].map((speed) => (
                                        <button
                                            key={speed}
                                            onClick={() => changePlaybackSpeed(speed)}
                                            className={`block w-full text-left px-2 py-1 text-white hover:bg-orange-500 rounded ${playbackSpeed === speed ? 'bg-orange-500' : ''}`}
                                        >
                                            {speed}x
                                        </button>
                                    ))}
                                </div>
                            )}
                            <button onClick={toggleFullscreen} className="hover:text-orange-500">
                                {fullscreen ? <Minimize2 /> : <Maximize2 />}
                            </button>
                        </div>
                    </div>
                </div>
                {/*chat*/}
            </div>
        </div>
    );
};

export default Video;
