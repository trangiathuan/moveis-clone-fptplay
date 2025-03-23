import { Play, Heart, Share2, Star } from "lucide-react";

const Video_comp = () => {

    return (
        <div>
            {/* Video Section */}
            <div className="w-full max-w-5xl relative pt-20">
                <video
                    className="w-full rounded-lg"
                    src={require('../../asset/video/naruto.mp4')}
                    controls
                    poster="/path-to-poster.jpg"
                    autoplay
                    preload="auto"
                />
            </div>
        </div>
const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  // Xử lý Play/Pause
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  // Xử lý mute/unmute
  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Xử lý tiến độ video
  const handleProgress = () => {
    const progressValue = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progressValue);
  };

  // Xử lý toàn màn hình
  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };
    return(
        <div className="relative w-full max-w-4xl mx-auto bg-black text-white">
      {/* Video */}
      <video
        ref={videoRef}
        src="frontend/src/asset/videos/9convert.com - THẦY BA CHÚC MỪNG SINH NHẬT 2023.mp4"
        className="w-full h-[400px]"
        onTimeUpdate={handleProgress}
      />

      {/* Nút Play */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <Play className="text-white w-16 h-16" />
        </button>
      )}

      {/* Điều khiển */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-60 flex items-center justify-between">
        {/* Nút Play/Pause */}
        <button onClick={togglePlay}>
          {isPlaying ? <Pause className="text-white w-6 h-6" /> : <Play className="text-white w-6 h-6" />}
        </button>

        {/* Thanh Tiến Độ */}
        <input
          type="range"
          value={progress}
          onChange={(e) => (videoRef.current.currentTime = (e.target.value / 100) * videoRef.current.duration)}
          className="w-full mx-4"
        />

        {/* Nút Âm Lượng */}
        <button onClick={toggleMute}>
          {isMuted ? <VolumeX className="text-white w-6 h-6" /> : <Volume2 className="text-white w-6 h-6" />}
        </button>

        {/* Nút Fullscreen */}
        <button onClick={handleFullscreen}>
          <Expand className="text-white w-6 h-6" />
        </button>
      </div>
    </div>

    )
}
export default Video_comp;