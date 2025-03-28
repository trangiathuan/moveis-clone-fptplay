const connection = require("../configs/configDatabase");
const sql = require('mssql');

exports.checkFollowMovieService = async (movieID, userID) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'checkFollowingMovie')
            .input('id', sql.Int, userID)
            .input('movieID', sql.VarChar, movieID)
            .execute('SP_Users')
        return result.recordset
    } catch (error) {
        console.log(error);

    }
}

exports.toggleFollowMovieService = async (movieID, userID) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'toggleFollowMovie')
            .input('id', sql.Int, userID)
            .input('movieID', sql.VarChar, movieID)
            .execute('SP_Users')
        return result.recordset
    } catch (error) {
        console.log(error);
    }
}