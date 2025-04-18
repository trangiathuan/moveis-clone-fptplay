const amqp = require('amqplib');

let connection;
let channel;

const RABBITMQ_URL = 'amqp://localhost:5672'; // Hoặc từ .env nếu bạn dùng Docker

const connectRabbitMQ = async () => {
    const maxRetries = 5;
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            connection = await amqp.connect(RABBITMQ_URL);
            channel = await connection.createChannel();
            console.log('✅ Đã kết nối RabbitMQ');
            break;
        } catch (error) {
            attempt++;
            console.error(`❌ Kết nối RabbitMQ thất bại (lần ${attempt})`);
            await new Promise((res) => setTimeout(res, 5000)); // đợi 5s rồi thử lại
        }
    }
};


// Hàm này cho phép các file khác dùng `await getChannel()` để truy cập
const getChannel = async () => {
    if (!channel) {
        await connectRabbitMQ();
    }
    return channel;
};

module.exports = {
    connectRabbitMQ,
    getChannel,
};
