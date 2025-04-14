const crypto = require('crypto');
const nodemailer = require('nodemailer');
const connection = require("../configs/configDatabase");
const sql = require('mssql');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Cấu hình Nodemailer với thông tin tài khoản Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'trangiathuan8223@gmail.com',
        pass: 'spyh ugmo nvch dhtb',
    },
});

// Hàm gửi email OTP
const sendOtpEmail = async (recipientEmail, otp) => {
    const mailOptions = {
        from: 'trangiathuan8223@gmail.com',
        to: recipientEmail,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
let otpDatabase = {};

exports.sendOtpEmailService = (email) => {
    try {

        const OTP_EXPIRY_TIME = 5 * 60 * 1000;

        const otp = crypto.randomInt(100000, 999999).toString();

        otpDatabase[email] = {
            otp: otp,
            expiry: Date.now() + OTP_EXPIRY_TIME, // Thời gian hết hạn
        };

        console.log('email: ', email, 'OTP: ', otp);

        sendOtpEmail(email, otp)

        return otpDatabase

    } catch (error) {
        console.log('Error nè: ', error);
    }
}

exports.verifyOTPService = async (email, otp) => {
    const storedOtp = otpDatabase[email];

    if (!storedOtp) {
        return {
            EC: -1,
            Status: 'Failed',
            Message: 'OTP không được yêu cầu hoặc đã hết hạn'
        };
    }

    if (storedOtp.otp === otp && Date.now() < storedOtp.expiry) {
        try {
            const pool = await connection();
            const result = await pool.request()
                .input('action', sql.VarChar, 'InsertUser')
                .input('email', sql.VarChar, email)
                .execute('SP_Users');
            const idUser = (result.recordset[0].id);
            const emailUser = (result.recordset[0].email);
            const role = (result.recordset[0].role);
            console.log(result.recordset);


            const token = jwt.sign({
                id: idUser,
                email: emailUser,
                role: role
            },
                process.env.SecretKey, { expiresIn: '30d' }
            )
            return {
                EC: 0,
                Status: 'Success',
                Message: 'Xác thực OTP thành công',
                Data: result.recordset,
                token
            };
        } catch (error) {
            console.log('Erorr:', error);
        }
    } else {
        return {
            EC: -1,
            Status: 'Failed',
            Message: 'Xác thực OTP thất bại'
        };
    }
}