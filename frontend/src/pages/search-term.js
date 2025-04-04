
import Footer from "../components/public-component/footer";
import Navbar from "../components/public-component/navbar";
import Search from "../components/search";


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