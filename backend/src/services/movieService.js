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

exports.getBySlugMovieNameService = async (slugMovieName, slugEpisode) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getBySlugMovieName')
            .input('SlugMovieName', sql.NVarChar, slugMovieName)
            .input('SlugEpisode', sql.NVarChar, slugEpisode)
            .execute('SP_Movies')
        return result.recordset;

    } catch (error) {
        console.log(error);
    }
}

exports.getByCategoryNameService = async (slugCategoryName) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getByCategoryName')
            .input('SlugCategoryName', sql.VarChar, slugCategoryName)
            .execute('SP_Movies')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

exports.getListMoviesService = async (slugMovieName) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getListMovies')
            .input('SlugMovieName', sql.VarChar, slugMovieName)
            .execute('SP_Movies')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}