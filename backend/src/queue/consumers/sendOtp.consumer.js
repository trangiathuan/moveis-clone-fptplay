const { getChannel } = require('../index'); // Đường dẫn tới file kết nối RabbitMQ
const nodemailer = require('nodemailer');

// Cấu hình transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'trangiathuan8223@gmail.com',
        pass: 'spyh ugmo nvch dhtb',
    },
});

// Hàm gửi email
const sendOtpEmail = async (recipientEmail, otp) => {
    const mailOptions = {
        from: 'trangiathuan8223@gmail.com',
        to: recipientEmail,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Đã gửi OTP đến ${recipientEmail}`);
    } catch (error) {
        console.error('❌ Lỗi khi gửi email:', error);
    }
};

// Hàm khởi chạy consumer
const startConsumer = async () => {
    const channel = await getChannel();
    const queue = 'send_otp_queue';

    await channel.assertQueue(queue, { durable: true });

    console.log(`🟢 Đang chờ OTP từ queue "${queue}"...`);

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const { email, otp } = JSON.parse(msg.content.toString());
            console.log('📥 Nhận OTP:', email, otp);

            await sendOtpEmail(email, otp);

            channel.ack(msg); // Xác nhận đã xử lý message
        }
    });
};

startConsumer();
