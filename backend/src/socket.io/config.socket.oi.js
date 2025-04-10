
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        let currentRoom = null;

        socket.on('join_room', (joinRoom) => {
            const roomId = joinRoom.roomId;
            const email = joinRoom.email
            const check = joinRoom.check
            const newTime = joinRoom.newTime
            if (currentRoom) {
                socket.leave(currentRoom);
            }
            console.log(joinRoom);

            socket.join(roomId);
            currentRoom = roomId;
            console.log(`User joined room: ${roomId}`);
            if (check === 1) {
                socket.to(roomId).emit('user_joined', { message: `${email} đã tham gia phòng` });
            }
        });

        socket.on('send_message', (message) => {
            if (currentRoom) {
                console.log(`Message in room ${currentRoom}:`, message);
                io.to(currentRoom).emit('receive_message', message);
            } else {
                socket.emit('error', { message: 'Bạn cần tham gia một phòng trước khi gửi tin nhắn' });
            }
        });

        socket.on('leave_room', (leftRoom) => {
            if (currentRoom) {
                const roomId = leftRoom.roomId;
                const email = leftRoom.email
                socket.leave(roomId);
                socket.to(roomId).emit('user_left', {
                    message: `${email} đã rời khỏi phòng.`,
                });
            }
        });


        socket.on('video_play', () => {
            console.log(currentRoom);

            if (currentRoom) {
                socket.to(currentRoom).emit('video_play')
                console.log(`Video play event emitted to room ${currentRoom}`);
            }
        })

        socket.on('video_pause', () => {
            if (currentRoom) {
                socket.to(currentRoom).emit('video_pause')
                console.log(`Video pause event emitted to room ${currentRoom}`);
            }
        })

        socket.on("video_seek", (data) => {
            if (currentRoom) {
                io.to(currentRoom).emit("video_seek", data);
                console.log(`Video seek event emitted to room ${currentRoom}`);
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};
