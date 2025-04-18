import { Crown } from "lucide-react";

const RoomMembers = () => {
    return (
        <div className="text-white pt-5 lg:px-7">
            <p className="text-2xl font-bold">
                Thành viên tham gia
            </p>
            <div className="mt-1 flex space-x-2 pb-2">
                <p className="text-base font-bold text-orange-500">Trần Gia Thuận</p><span><Crown color="yellow" /></span>
            </div>
            <div className="space-y-2">
                <p className="text-base font-bold text-zinc-500">Vũ Ngọc Quang Minh</p>
                <p className="text-base font-bold text-zinc-500">Lê Minh Quí</p>
                <p className="text-base font-bold text-zinc-500">Nguyễn Hoài Phong</p>
                <p className="text-base font-bold text-zinc-500">Trần Trung Thu</p>
            </div>
        </div>
    )
}
export default RoomMembers;