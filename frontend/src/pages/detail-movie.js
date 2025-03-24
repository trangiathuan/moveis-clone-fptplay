import Detail from "../components/deatail_movies/detail-movie";
import Navbar from "../components/navbar";

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