const connection = require("../configs/configDatabase");
const sql = require('mssql');

exports.getAllMovieNewService = async () => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getAllMoviesNew')
            .execute('SP_Movies')

        return result;
    } catch (error) {
        console.log(error);

    }

}

exports.getByMovieIDService = async (movieID) => {
    console.log('Data sent to server:', movieID);
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getByMovieID')
            .input('MovieID', sql.Int, movieID)
            .execute('SP_Movies')
        return result;
    } catch (error) {
        console.log(error);

    }
}

exports.getByCategoryNameService = async (categoryName) => {
    console.log('Data sent to server:', categoryName);
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getByCategoryName')
            .input('CategoryName', sql.VarChar, categoryName)
            .execute('SP_Movies')
        return result;
    } catch (error) {
        console.log(error);
    }
}