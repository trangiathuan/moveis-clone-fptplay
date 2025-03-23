const sql = require('mssql');

const config = {
    user: 'giathuan',      // Tên người dùng SQL Server
    password: '123',  // Mật khẩu của người dùng SQL Server
    server: 'localhost',    // Địa chỉ IP của file server (máy chủ SQL Server)
    port: 1433,                 // Cổng SQL Server (mặc định là 1433)
    database: 'moviesDB',         // Tên cơ sở dữ liệu
    options: {
        encrypt: true,            // Bảo mật kết nối
        trustServerCertificate: true  // Bỏ qua xác thực SSL
    }
};

const connection = () => {
    const conn = sql.connect(config)
        .then(pool => {
            console.log('Connected to SQL Server!');
            return pool;
        })
        .catch(err => {
            console.error('Database connection failed:', err);
            throw err;
        });
    return conn;
}

module.exports = connection;



