const { getChannel } = require('../index');

exports.sendOtpToQueue = async (email, otp) => {
    const channel = await getChannel();
    const queue = 'send_otp_queue';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify({ email, otp })), {
        persistent: true,
    });
    // sendOtpEmail(email, otp)
    console.log('Gửi OTP vào queue:', email, otp);
};
