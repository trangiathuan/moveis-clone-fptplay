
import EditUser from "../components/public-component/edit_user";
import Navbar from "../components/public-component/navbar";
const Information = () => {
    return (
        <div className="bg-black overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            <div>
                <EditUser />
            </div>
        </div>
    )
}
export default Information;