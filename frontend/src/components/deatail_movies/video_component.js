import { useRef, useState } from "react";
import { Play, Pause, RotateCcw, RotateCw, Flag, SkipForward, Settings, Minimize2, Maximize2, Subtitles } from "lucide-react";
const Video_comp = () => {
    const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const skipTime = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  const updateProgress = () => {
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const changePlaybackSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

    return(
        <div className="relative w-full max-w-3xl mx-auto">
      <video 
        ref={videoRef} 
        className="w-full rounded-lg" 
        src="https://res.cloudinary.com/dkp3rw6p8/video/upload/v1742749049/9convert.com_-_TH%E1%BA%A6Y_BA_CH%C3%9AC_M%E1%BB%AANG_SINH_NH%E1%BA%ACT_2023_PH%E1%BA%A6N_2_filcqc.mp4" 
        controls={false} 
        onTimeUpdate={updateProgress}
      ></video>
      
      <div className="absolute bottom-10 left-2 right-2 h-1 bg-gray-500 rounded overflow-hidden">
        <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between p-2 bg-black bg-opacity-50 rounded-lg">
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
    )
}
export default Video_comp;