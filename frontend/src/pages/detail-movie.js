import Detail from "../components/detail_movies_component/detail-movie";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
const DetailMovie = () => {
    return (
        <div className="bg-black">
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