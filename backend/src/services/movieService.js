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

exports.getBySlugMovieNameService = async (slugMovieName) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getBySlugMovieName')
            .input('SlugMovieName', sql.NVarChar, slugMovieName)
            .execute('SP_Movies')
        return result.recordset;

    } catch (error) {
        console.log(error);
    }
}

exports.getByEpisodeService = async (slugMovieName, slugEpisode) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getByEpisode')
            .input('SlugMovieName', sql.VarChar, slugMovieName)
            .input('SlugEpisode', sql.VarChar, slugEpisode)
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