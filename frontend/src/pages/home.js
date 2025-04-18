import Carousel from "../components/home-components/carousel";
import EventSports from "../components/home-components/events-sports";
import Footer from "../components/public-components/footer";
import MoviesHot from "../components/home-components/movies-hot";
import Navbar from "../components/public-components/navbar";
import NewlyReleased from "../components/home-components/newly-released";

const Home = () => {
    return (
        <div className="bg-black overflow-x-hidden">
            <div>
                <Navbar />
            </div>
            <div className="pt-14 ">
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
            </div>

        </div>
    )
}
export default Home;