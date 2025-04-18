
import Footer from "../components/public-components/footer";
import Navbar from "../components/public-components/navbar";
import Search from "../components/public-components/search";



const SearchTerm = () => {
    return (
        <div className="bg-black">
            <div>
                <Navbar />
            </div>
            <div className="pt-20">
                <Search />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
export default SearchTerm;