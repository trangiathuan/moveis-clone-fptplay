import FormInput from "../components/join-room-components/form-input-join-room";
import Navbar from "../components/public-components/navbar"

const JoinRoom = () => {
    return (
        <div className="bg-black overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            <div>
                <FormInput />
            </div>
        </div>
    )
}
export default JoinRoom;