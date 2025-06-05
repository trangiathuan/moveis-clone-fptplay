const amqp = require('amqplib');

let connection = null;
let channel = null;

const RABBITMQ_URL = `amqp://${process.env.RABBITMQ_HOST || 'localhost'}:5672`;

const connectRabbitMQ = async () => {
    const maxRetries = 5;
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            connection = await amqp.connect(RABBITMQ_URL);

            connection.on('error', (err) => {
                console.error('RabbitMQ connection error:', err);
                connection = null;
                channel = null;
            });

            connection.on('close', () => {
                console.warn('RabbitMQ connection closed');
                connection = null;
                channel = null;
            });

            channel = await connection.createChannel();

            channel.on('error', (err) => {
                console.error('RabbitMQ channel error:', err);
                channel = null;
            });

            channel.on('close', () => {
                console.warn('RabbitMQ channel closed');
                channel = null;
            });

            console.log('✅ Đã kết nối RabbitMQ và tạo channel');
            return;
        } catch (error) {
            attempt++;
            console.error(`❌ Kết nối RabbitMQ thất bại (lần ${attempt}):`, error.message);
            await new Promise((res) => setTimeout(res, 5000));
        }
    }
    throw new Error('🚨 Không thể kết nối RabbitMQ sau nhiều lần thử.');
};

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
