import { useState, useMemo, useRef, useEffect } from "react"; // Thêm useRef
import axios from "axios";
import API from "../../configs/endpoint";
import { jwtDecode } from "jwt-decode";

// --- Icons ---
const PaperAirplaneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);
// --- Hết Icons ---


const Comment_movies = ({ moviesData }) => {
    const MovieID = moviesData.MovieID
    const commentBgClass = "bg-neutral-900";
    const loggedInUserAvatarUrl = "https://placehold.co/40x40/7f7f7f/FFFFFF.png?text=Me";
    const INITIAL_VISIBLE_COMMENTS = 5;
    const [allComments, setAllComments] = useState([])
    const [contents, setContents] = useState()
    let email = '';
    let role = ''

    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            email = decoded.email;
            role = decoded.role;
            console.log(decoded);


        } catch (err) {
            console.error("Token không hợp lệ:", err);
        }
    }


    useEffect(() => {
        getComments()
    }, [])

    const getComments = async () => {
        const result = await axios.post(`${API}/getComments`, { MovieID })
        if (result.data.EC === 0) {
            setAllComments(result.data.Data)
        }
    }

    const handleComment = async () => {
        console.log(contents);

        const result = await axios.post(`${API}/createComment`, { MovieID, email, contents })
        if (result.data.EC === 0) {
            getComments()
            console.log(result.data.Data);
        }
        setContents('')

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleComment()
        }
    };

    const totalCommentCount = allComments.length;
    const [visibleCommentCount, setVisibleCommentCount] = useState(INITIAL_VISIBLE_COMMENTS);
    const visibleComments = allComments.slice(0, visibleCommentCount);

    // --- Thêm Ref cho khu vực chứa nút ---
    const buttonContainerRef = useRef(null); // Khởi tạo ref

    const handleLoadMore = () => {
        setVisibleCommentCount(totalCommentCount);
    };

    const handleCollapse = () => {
        setVisibleCommentCount(INITIAL_VISIBLE_COMMENTS);
        // --- Cuộn tới khu vực nút (dùng setTimeout) ---
        // Đợi DOM cập nhật sau khi state thay đổi rồi mới cuộn
        setTimeout(() => {
            buttonContainerRef.current?.scrollIntoView({
                behavior: 'smooth', // Cuộn mượt
                block: 'nearest'   // Cuộn sao cho phần tử gần nhất với mép view (ít cuộn nhất)
            });
        }, 0); // Chạy ngay sau khi stack hiện tại trống
    };

    const canExpandOrCollapse = totalCommentCount > INITIAL_VISIBLE_COMMENTS;
    const isShowingAll = visibleCommentCount === totalCommentCount;

    return (
        <div className="max-w-6xl mx-auto bg-neutral text-white">
            {/* Phần tiêu đề */}
            <div className="px-4 pt-4 sm:pt-6">
                <h2 className="text-base sm:text-lg font-bold mb-2">Bình luận ({totalCommentCount})</h2>
            </div>

            {/* Phần Nhập Liệu */}
            <div className="px-4 mb-4">
                <div className="flex items-center bg-neutral-800 rounded-lg p-2 gap-2">
                    <img src={loggedInUserAvatarUrl} alt="User Avatar" className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Viết bình luận..."
                        className="flex-1 bg-transparent text-white placeholder-gray-400 border-none focus:ring-0 focus:outline-none p-2 text-sm sm:text-base"
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                        onKeyDown={handleKeyDown} />
                    <button className="flex-shrink-0 text-orange-500 hover:text-orange-400 p-1 rounded"
                        type="submit"
                        onClick={handleComment}>
                        <PaperAirplaneIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Phần danh sách bình luận */}
            <div id="comments-list-section" className="space-y-3 sm:space-y-4 px-4 pb-4">
                {visibleComments.map((comment) => (
                    <div key={comment.commentId} className={`${commentBgClass} p-3 rounded-lg flex items-start gap-2 sm:gap-3`}>
                        <img
                            src='https://scontent.fsgn18-1.fna.fbcdn.net/v/t39.30808-6/479512658_1351962522704344_8795569477034108113_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHZ3GtCb8fAyfyxbYVX7ws9e4aEFlagktJ7hoQWVqCS0m5PPEugp9fl3txXdOHWO-E_nd0ucVcxCcEKPgW77XLW&_nc_ohc=rCy1mghqR8QQ7kNvwEglEj3&_nc_oc=AdkfFSOUzrKvEXptERPy3KNJyaD_kHNeFVrxYG108Dp1VzjmQB2ygcXxiaKzD_FxJ_weuF-LpCyKaM288JEOTxvu&_nc_zt=23&_nc_ht=scontent.fsgn18-1.fna&_nc_gid=7dJxf9tp7xLfoBtVo7AHLA&oh=00_AfH1lybbI-D4bL6oQObpzadxUNp0cEvq2wpMm3Ez_kHgmg&oe=67FE9047'
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                            <p className="text-xs sm:text-sm text-gray-400">{comment.email ? comment.email : 'unknown'} • {comment.createdAt}</p>
                            <p className="mt-1 text-sm sm:text-base text-white">{comment.contents}</p>
                        </div>
                    </div>
                ))}

                {/* Nút "Xem thêm" / "Thu gọn" */}
                {canExpandOrCollapse && (
                    // --- Gắn ref vào div chứa nút ---
                    <div ref={buttonContainerRef} className="pt-2 text-center">
                        {isShowingAll ? (
                            <button
                                onClick={handleCollapse}
                                className="text-gray-400 hover:text-gray-300 font-semibold px-4 py-2 text-sm sm:text-base"
                            >
                                Thu gọn
                            </button>
                        ) : (
                            <button
                                onClick={handleLoadMore}
                                className="text-orange-400 hover:text-orange-300 font-semibold px-4 py-2 text-sm sm:text-base"
                            >
                                Xem thêm bình luận
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Comment_movies;