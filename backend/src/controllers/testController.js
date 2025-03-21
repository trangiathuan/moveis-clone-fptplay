const testService = require('../services/testService')

exports.getTest = async (req, res) => {
    try {
        const result = await testService.getTest(2);  // Gọi service để lấy dữ liệu
        res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result
        });
    } catch (err) {
        res.status(500).send({ message: 'Error querying data', error: err.message });
    }
};

