
import DetailPackage from "../components/public-components/detail_package";

import Footer from "../components/public-components/footer";
import Navbar from "../components/public-components/navbar";


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