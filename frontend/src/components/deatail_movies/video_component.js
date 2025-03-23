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
    )
}
export default Video_comp;