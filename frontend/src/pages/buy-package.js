
import DetailPackage from "../components/public-component/detail_package";

import Footer from "../components/public-component/footer";
import Navbar from "../components/public-component/navbar";


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