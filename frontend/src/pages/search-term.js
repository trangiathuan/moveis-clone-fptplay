
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Search from "../components/search";


const SearchTerm = () => {
    return (
        <div className="bg-black">
            <div>
                <Navbar />
            </div>
            <div>
                <Search />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
export default SearchTerm;