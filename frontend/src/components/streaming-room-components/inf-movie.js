import ActionButtons from "../detail-movies-component/actions-buttons";
import Star_comp from "../detail-movies-component/star_comp";

const InfMovie = () => {
    return (
        <div className="block sm:flex xl:space-x-80 lg:space-x-24 md:space-x-52 sm:space-x-32">
            <div className="text-white pt-5">
                <p className="text-2xl font-bold">Shin cậu bé bút chì</p>
                <p className="text-base font-bold pt-2 pb-2">Shin Chan</p>
                <Star_comp />
                <div className="mt-3 text-sm text-white">
                    <span className="text-red-500 text-base font-bold">
                        New
                    </span>

                    <span className="mx-2 text-neutral-400">•</span>
                    <span>2025</span>

                    <span className="mx-2 text-neutral-400">•</span>
                    <span>T18</span>
                    <span className="mx-2 text-neutral-400">•</span>
                    <span>300/300 tập</span>
                    <span className="mx-2 text-neutral-400">•</span>
                    <span>Nhật bản</span>
                </div>

            </div>
            <div className="text-white text-base pt-5 space-y-2">
                <div className="flex flex-wrap items-center -ms-4 gap-4 text-white text-sm ">
                    <ActionButtons />
                </div>
                <div className="flex flex-wrap">
                    <span className="font-semibold w-24">Diễn viên:</span>
                    <span className="text-gray-300 flex-1">Trần Gia Thuận</span>
                </div>
                <div className="flex flex-wrap">
                    <span className="font-semibold w-24">Đạo diễn:</span>
                    <span className="text-gray-300 flex-1">Trần Gia Thuận</span>
                </div>
                <div className="flex flex-wrap">
                    <span className="font-semibold w-24">Thể loại:</span>
                    <span className="text-gray-300 flex-1">Hoạt hình, phiêu lưu</span>
                </div>
                <div className="flex flex-wrap">
                    <span className="font-semibold w-24">Danh mục:</span>
                    <span className="text-gray-300">Anime</span>
                </div>
            </div>
        </div>
    )
}
export default InfMovie;