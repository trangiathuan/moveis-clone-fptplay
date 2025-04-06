import { Radio, SendHorizontal } from 'lucide-react';
import './chats.css';

const ChatsStreaming = () => {
    return (
        <div className="bg-zinc-1000 border border-orange-800 text-white rounded-lg xl:p-5 xl:m-0 lg:m-5 lg:p-5 lg:mx-8 md:p-5 md:m-5 sm:m-5 sm:p-5 m-2 p-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b border-gray-400 pb-2">
                <div className="flex space-x-2">
                    <p className="flex font-semibold text-lg space-x-3"><span><Radio /></span><span className='text-red-600'>Live</span> <span> Movie Streaming</span></p>
                </div>
                <span className="cursor-pointer text-lg hover:text-red-500 transition duration-200">x</span>
            </div>

            {/* Danh sách tin nhắn */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 sm:max-h-[380px] max-h-72 scrollbar-hidden">
                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="bg-zinc-9000 rounded p-2 text-sm">
                        <strong className='text-fuchsia-500'>Người {index % 2 === 0 ? 'A' : 'B'}:</strong> Đây là tin nhắn số {index + 1}
                    </div>
                ))}
            </div>

            {/* Ô nhập chat */}
            <div className="mt-4 flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Nhập bình luận..."
                    className="flex-1 bg-black rounded px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-black hover:bg-orange-700 text-white px-4 py-2 rounded text-sm transition duration-200">
                    <SendHorizontal color='red' />
                </button>
            </div>
        </div>
    );
};

export default ChatsStreaming;