import { Radio, SendHorizontal, X, LogIn, LogOut, Users } from 'lucide-react';
import './chats.css';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
import SOCKET from '../../configs/socket.io.js'
import API from '../../configs/endpoint.js';
import axios from 'axios';
const socket = io(SOCKET);

const ChatsStreaming = () => {
    const [showChats, setShowChats] = useState(true);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [error, setError] = useState('');
    const messagesContainerRef = useRef(null);

    const { roomId } = useParams();
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const email = decoded.email







    useEffect(() => {
        // Lắng nghe tin nhắn từ server
        socket.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Lắng nghe lỗi từ server
        socket.on('error', (error) => {
            setError(error.message);
            setTimeout(() => setError(''), 5000); // Xóa lỗi sau 5 giây
        });

        // Lắng nghe khi có người tham gia phòng
        socket.on('user_joined', (data) => {
            setMessages(prevMessages => [...prevMessages, { content: data.message, system: true }]);
        });

        socket.on('user_left', (data) => {
            setMessages(prevMessages => [...prevMessages, { content: data.message, system: true }]);
        });

        return () => {
            socket.off('receive_message');
            socket.off('error');
            socket.off('user_joined');
            socket.off('user_left');

            // Rời phòng khi component unmount
            if (currentRoom) {
                socket.emit('leave_room', { roomId: currentRoom, email: email });
            }
        };
    }, [currentRoom]);

    useEffect(() => {
        // Gửi sự kiện rời phòng khi reload hoặc rời trang
        const handleBeforeUnload = () => {
            if (currentRoom) {
                socket.emit('leave_room', { roomId: currentRoom, email: email });
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Gỡ bỏ lắng nghe khi component unmount
            window.removeEventListener('beforeunload', handleBeforeUnload);

            // Gửi sự kiện leave_room khi unmount (VD: chuyển sang component khác)
            if (currentRoom) {
                socket.emit('leave_room', { roomId: currentRoom, email: email });
            }
        };
    }, [currentRoom])

    useEffect(() => {
        if (roomId && decoded?.email) {
            const joinRoomData = { roomId: roomId, email: email, check: 1 };
            socket.emit('join_room', joinRoomData);
            setCurrentRoom(roomId);
            setMessages([]);
            setError('');
        }

        return () => {
            if (roomId && decoded?.email) {
                socket.emit('leave_room', { roomId: roomId, email: email });
            }
        };
    }, []);



    // Cải thiện cơ chế cuộn
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);



    const handleSendMessage = (content) => {


        if (!content.trim()) return; // Ngăn gửi tin nhắn trống
        if (!currentRoom) {
            setError('Bạn cần tham gia một phòng trước khi gửi tin nhắn');
            setTimeout(() => setError(''), 5000);
            return;
        }

        const newMessage = { content: content, sender: decoded.email }; // Có thể thêm ID người dùng thực tế
        socket.emit('send_message', newMessage); // Gửi tin nhắn tới server
        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(message);
        }
    };

    const toggleShowChat = () => {
        setShowChats(!showChats);
    };

    return (
        <div>
            <div className={`${showChats ? 'hidden' : 'flex'} justify-center bg-zinc-1000 border border-orange-800 text-white rounded-lg xl:mt-0 mt-5`}>
                <button onClick={toggleShowChat} className='text-base hover:text-orange-500 min-w-[286px] h-14'>Hiển thị cuộc trò chuyện</button>
            </div>
            <div className={`${showChats ? 'block' : 'hidden'}`}>
                <div className="bg-zinc-1000 border border-orange-800 text-white rounded-lg xl:mt-0 mt-5 p-5 max-h-[580px] min-h-[510px] flex flex-col">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-400 pb-2">
                        <div className="flex space-x-2">
                            <p className="flex font-semibold text-lg space-x-2">
                                <span className='mt-[2px]'><Radio /></span>
                                <span className='text-red-600'>Live</span>
                                <span> Movie</span>
                                <span></span>
                                {currentRoom && <span className="text-green-500 ml-2">{currentRoom}</span>}
                            </p>
                        </div>
                        <span className="cursor-pointer text-lg hover:text-red-500 transition duration-200 ps-0" onClick={toggleShowChat}><X /></span>
                    </div>

                    {/* Hiển thị thông báo lỗi nếu có */}
                    {error && (
                        <div className="bg-red-500 text-white p-2 mb-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    {/* Danh sách tin nhắn */}
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 min-h-[360px] overflow-y-auto space-y-1 pr-2 sm:max-h-[320px] max-h-72 scrollbar-hidden"
                    >
                        {currentRoom ? (
                            messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <div key={index} className={`${msg.system ? 'bg-gray-800' : 'bg-black'} rounded p-2 text-sm`}>
                                        {msg.system ? (
                                            <span className="text-gray-400">{msg.content}</span>
                                        ) : (
                                            <>
                                                {email === msg.sender ?
                                                    (
                                                        <>
                                                            <strong className='text-orange-500'>{msg.sender || 'Người dùng'}:</strong> {msg.content}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <strong className='text-fuchsia-700'>{msg.sender || 'Người dùng'}:</strong> {msg.content}
                                                        </>
                                                    )}
                                            </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <Users size={40} />
                                    <p className="mt-2">Chưa có tin nhắn nào trong phòng này</p>
                                </div>
                            )
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <LogIn size={40} />
                                <p className="mt-2">Hãy tham gia một phòng để bắt đầu trò chuyện</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder={currentRoom ? "Nhập bình luận..." : "Tham gia phòng để chat..."}
                            className="flex-1 bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={!currentRoom}
                        />
                        <button
                            onClick={() => handleSendMessage(message)}
                            className={`bg-black text-white px-4 py-2 rounded text-sm ${!currentRoom ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!currentRoom}
                        >
                            <SendHorizontal color={currentRoom ? 'red' : 'gray'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatsStreaming;