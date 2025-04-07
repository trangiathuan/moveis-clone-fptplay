import Navbar from "../components/public-component/navbar";
import Footer from "../components/public-component/footer";
import Video from "../components/public-component/video";
import ChatsStreaming from "../components/streaming-room-components/chats-streaming";
import RoomMembers from "../components/streaming-room-components/room-members";
import InfMovie from "../components/streaming-room-components/inf-movie";

const StreamingRoom = () => {
    const videoSrc = 'https://res.cloudinary.com/dteuqunrm/video/upload/v1743780230/shin-cau-be-but-chi-tap-1_x6wkhr.webm'
    return (
        <div className="bg-black overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            <div className="pt-24">
                <div className="block xl:flex max-w-7xl mx-auto md:px-24 sm:px-8 px-2 xl:px-10 xl:space-x-2 space-x-0">
                    <Video videoSrc={videoSrc} />
                    <ChatsStreaming />
                </div>
            </div>
            <div className="lg:flex block justify-between xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-[600px] xl:mx-auto md:mx-28 sm:mx-8 mx-2 sm:max-w-[550px]">
                <div className="">
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