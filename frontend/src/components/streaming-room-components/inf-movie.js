import ActionButtons from "../detail-movies-components/actions-buttons";
import Star_comp from "../detail-movies-components/star_comp";

const InfMovie = ({ movideData }) => {
    console.log(movideData);

    return (
        <div className="block sm:flex xl:space-x-80 lg:space-x-24 md:space-x-52 sm:space-x-32">
            <div className="text-white pt-5">
                <p className="text-2xl font-bold">{movideData.MovieNameVietnamese} - {movideData.EpisodeNumber}</p>
                <p className="text-base font-bold pt-2 pb-2">{movideData.MovieNameVietnamese}</p>
                <Star_comp />
                <div className="mt-3 text-sm text-white">
                    <span className="text-red-500 text-base font-bold">
                        {movideData.MovieStatus}
                    </span>

                    <span className="mx-2 text-neutral-400">•</span>
                    <span>{movideData.ReleaseYear}</span>

                    <span className="mx-2 text-neutral-400">•</span>
                    <span>{movideData.AgeRestriction}</span>
                    <span className="mx-2 text-neutral-400">•</span>
                    <span>{movideData.NumberOfEpisodes}</span>
                    <span className="mx-2 text-neutral-400">•</span>
                    <span>{movideData.Country}</span>
                </div>

            </div>
            <div className="text-white text-base pt-5 space-y-2 max-w-64">
                <div className="flex flex-wrap items-center -ms-4 gap-4 text-white text-sm ">
                    <ActionButtons />
                </div>
                <div className="flex flex-wrap">
                    <span className="font-semibold w-24">Diễn viên:</span>
                    <span className="text-gray-300 flex-1">{movideData.Actor}</span>
                </div>
                <div className="flex flex-wrap">
                    <span className="font-semibold w-24">Đạo diễn:</span>
                    <span className="text-gray-300 flex-1">{movideData.Director}</span>
                </div>
                <div className="flex flex-wrap">
                    <span className="font-semibold w-24">Thể loại:</span>
                    <span className="text-gray-300 flex-1">{movideData.MovieGenre}</span>
                </div>
                <div className="flex flex-wrap">
                    <span className="font-semibold w-24">Danh mục:</span>
                    <span className="text-gray-300">{movideData.CategoryName}</span>
                </div>
            </div>
        </div>
    )
}
export default InfMovie;