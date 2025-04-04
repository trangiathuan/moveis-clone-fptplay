import ActionButtons from "../detail_movies_component/actions-buttons";
import Star_comp from "../detail_movies_component/star_comp";

const InfMovie = () => {
    return (
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
            <div className="flex flex-wrap items-center -ms-4 gap-4 text-white text-sm mt-2">
                <ActionButtons />
            </div>
        </div>
    )
}
export default InfMovie;