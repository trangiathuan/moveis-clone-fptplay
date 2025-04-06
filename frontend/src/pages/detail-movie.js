import Detail from "../components/detail_movies_component/detail-movie";
import Navbar from "../components/public-component/navbar";
import Footer from "../components/public-component/footer";
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