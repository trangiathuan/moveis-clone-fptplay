


import EditUser from "../components/public-components/edit-user";
import Navbar from "../components/public-components/navbar";
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