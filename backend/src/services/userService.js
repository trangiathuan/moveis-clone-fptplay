const connection = require("../configs/configDatabase");
const sql = require('mssql');

exports.checkFollowMovieService = async (slugMovieName, userID) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'checkFollowingMovie')
            .input('id', sql.Int, userID)
            .input('SlugMovieName', sql.VarChar, slugMovieName)
            .execute('SP_Users')
        return result.recordset
    } catch (error) {
        console.log(error);

    }
}

exports.toggleFollowMovieService = async (slugMovieName, userID) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'toggleFollowMovie')
            .input('id', sql.Int, userID)
            .input('SlugMovieName', sql.VarChar, slugMovieName)
            .execute('SP_Users')
        return result.recordset
    } catch (error) {
        console.log(error);
    }
}

exports.getFollowingMoviesListService = async (userID) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('id', sql.Int, userID)
            .input('action', sql.VarChar, 'getFollowingMoviesList')
            .execute('SP_Users')
        return result.recordset
    } catch (error) {
        console.log(error);
    }
}