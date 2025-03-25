const connection = require("../configs/configDatabase");
const sql = require('mssql');

exports.getAllMovieNewService = async () => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getAllMoviesNew')
            .execute('SP_Movies')

        return result.recordset;
    } catch (error) {
        console.log(error);

    }

}

exports.getByMovieIDService = async (movieID, movieEpisodeID) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getByMovieID')
            .input('MovieID', sql.Int, movieID)
            .input('MovieEpisodeID', sql.Int, movieEpisodeID)
            .execute('SP_Movies')
        return result.recordset;

    } catch (error) {
        console.log(error);
    }
}

exports.getByCategoryNameService = async (categoryName) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getByCategoryName')
            .input('CategoryName', sql.VarChar, categoryName)
            .execute('SP_Movies')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}