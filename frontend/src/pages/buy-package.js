
import DetailPackage from "../components/detail_package";

import Footer from "../components/footer";
import Navbar from "../components/navbar";


const BuyPackage = () => {
    return (
        <div className="bg-black">
            <div>
                <Navbar />
            </div>
            <div>
                <DetailPackage />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
export default BuyPackage;