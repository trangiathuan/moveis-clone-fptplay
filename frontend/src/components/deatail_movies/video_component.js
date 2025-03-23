import { Play, Heart, Share2, Star } from "lucide-react";

const Video_comp = () => {
    return(
        <div>
            {/* Video Section */}
            <div className="w-full max-w-5xl relative">
                <video
                className="w-full rounded-lg"
                src="/path-to-video.mp4"
                controls
                poster="/path-to-poster.jpg"
                />
            </div>
        </div>
    )
}
export default Video_comp;