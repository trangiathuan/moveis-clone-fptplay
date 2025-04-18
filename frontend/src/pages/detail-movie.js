import Detail from "../components/detail-movies-components/detail-movie";
import Navbar from "../components/public-components/navbar";
import Footer from "../components/public-components/footer";
const DetailMovie = () => {
    return (
        <div className="bg-black overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            <div>
                <Detail />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
export default DetailMovie;