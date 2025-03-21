const connection = require("../configs/configDatabase");
const sql = require('mssql');  // Đảm bảo bạn đã nhập đúng thư viện mssql

exports.getTest = async (param1) => {
    console.log(param1);

    try {
        console.log('1');

        const pool = await connection();
        console.log('2');
        const result = await pool.request()
            .input('id', sql.Int, param1)
            .execute('proc_getTest');
        console.log('3');
        return result.recordset;
    } catch (err) {
        console.error('Error querying data:', err);
        throw new Error('Error querying data');
    }
};
