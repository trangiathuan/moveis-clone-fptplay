const OPTService = require('../services/OTPService')

exports.sendOTPController = async (req, res) => {
    const { email } = req.body
    console.log(req.body);

    if (!email) {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Không có dữ liệu email gửi về server'
        })
    }
    const result = await OPTService.sendOtpEmailService(email)
    if (result) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        });
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        })
    }
}

exports.verifyOTPController = async (req, res) => {
    const { email, otp } = req.body
    if (!email) {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Không có dữ liệu email gửi về server'
        })
    }

    if (!otp) {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Không có dữ liệu OTP gửi về server'
        })
    }

    const Data = await OPTService.verifyOTPService(email, otp)

    if (Data.EC === 0) {
        return res.status(200).json({
            Data
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        });
        return res.status(200).json({
            Data
        })
    }
}