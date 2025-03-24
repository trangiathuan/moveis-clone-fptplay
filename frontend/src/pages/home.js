import Carousel from "../components/carousel";
import EventSports from "../components/events-sports";
import Footer from "../components/footer";
import MoviesHot from "../components/movies-hot";
import Navbar from "../components/navbar";
import NewlyReleased from "../components/newly-released";

const Home = () => {
    return (
        <div className="bg-black">
            <div>
                <Navbar />
            </div>
            <div className="pt-14">
                <Carousel />
            </div>
            <div>
                <NewlyReleased />
            </div>
            <div>
                <EventSports />
            </div>
            <div>
                <MoviesHot />
            </div>
            <div>
                <Footer />
            </div>``
        </div>
    )
}
export default Home;