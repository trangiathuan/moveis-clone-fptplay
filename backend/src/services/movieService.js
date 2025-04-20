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

exports.getMovieByMovieIDService = async (MovieID) => {
    console.log(MovieID);

    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getMovieByMovieID')
            .input('MovieID', sql.Int, MovieID)
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

exports.deleteRoomMovieService = async () => {
    const pool = await connection()
    const result = await pool.request()
        .input('action', sql.VarChar, 'deleteMovieRoom')
        .execute('SP_Movies')
    return result.recordset
}

exports.createRoomMovieService = async (slugMovieName, slugEpisode, roomId, host) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'createMovieRoom')
            .input('SlugMovieName', sql.VarChar, slugMovieName)
            .input('SlugEpisode', sql.VarChar, slugEpisode)
            .input('roomId', sql.VarChar, roomId)
            .input('host', sql.VarChar, host)
            .execute('SP_Movies')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

exports.getMovieRoomService = async (roomId) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getMovieRoom')
            .input('roomId', sql.Int, roomId)
            .execute('SP_Movies')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

exports.getCommentsService = async (MovieID) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getComments')
            .input('MovieID', sql.Int, MovieID)
            .execute('SP_Movies')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

exports.createCommentsService = async (MovieID, contents, email) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'createComment')
            .input('MovieID', sql.Int, MovieID)
            .input('contents', sql.NVarChar, contents)
            .input('email', sql.VarChar, email)
            .execute('SP_Movies')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

// Admin    

exports.addNewMoviesService = async (MovieNameVietnamese, MovieNameEnglish, MovieStatus, ReleaseYear,
    AgeRestriction, NumberOfEpisodes, Country, SummaryTitle, SummaryContent, Actor, Director,
    MovieGenre, CategoryID, SlugMovieName, MovieImagePath) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'addNewMovie')
            .input('MovieNameVietnamese', sql.NVarChar, MovieNameVietnamese)
            .input('MovieNameEnglish', sql.NVarChar, MovieNameEnglish)
            .input('MovieStatus', sql.NVarChar, MovieStatus)
            .input('ReleaseYear', sql.Int, ReleaseYear)
            .input('AgeRestriction', sql.VarChar, AgeRestriction)
            .input('NumberOfEpisodes', sql.NVarChar, NumberOfEpisodes)
            .input('Country', sql.NVarChar, Country)
            .input('SummaryTitle', sql.NVarChar, SummaryTitle)
            .input('SummaryContent', sql.NVarChar, SummaryContent)
            .input('Actor', sql.NVarChar, Actor)
            .input('Director', sql.NVarChar, Director)
            .input('MovieGenre', sql.NVarChar, MovieGenre)
            .input('MovieImagePath', sql.NVarChar, MovieImagePath)
            .input('CategoryID', sql.Int, CategoryID)
            .input('SlugMovieName', sql.VarChar, SlugMovieName)
            .execute('SP_Admin')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

exports.addEpisodeMoviesService = async (MovieID, EpisodeNumber, EpisodeDescription, MovieFilePath, MovieImagePath, SlugEpisode) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'addEpisodeMovie')
            .input('MovieID', sql.Int, MovieID)
            .input('EpisodeNumber', sql.NVarChar, EpisodeNumber)
            .input('EpisodeDescription', sql.NVarChar, EpisodeDescription)
            .input('MovieFilePath', sql.NVarChar, MovieFilePath)
            .input('MovieImagePath', sql.NVarChar, MovieImagePath)
            .input('SlugEpisode', sql.VarChar, SlugEpisode)
            .execute('SP_Admin')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

exports.updateMoviesService = async (MovieID, MovieNameVietnamese, MovieNameEnglish, MovieStatus, ReleaseYear,
    AgeRestriction, NumberOfEpisodes, Country, SummaryTitle, SummaryContent, Actor, Director,
    MovieGenre, CategoryID, SlugMovieName, MovieImagePath) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'updateMovie')
            .input('MovieID', sql.Int, MovieID)
            .input('MovieNameVietnamese', sql.NVarChar, MovieNameVietnamese)
            .input('MovieNameEnglish', sql.NVarChar, MovieNameEnglish)
            .input('MovieStatus', sql.NVarChar, MovieStatus)
            .input('ReleaseYear', sql.Int, ReleaseYear)
            .input('AgeRestriction', sql.VarChar, AgeRestriction)
            .input('NumberOfEpisodes', sql.NVarChar, NumberOfEpisodes)
            .input('Country', sql.NVarChar, Country)
            .input('SummaryTitle', sql.NVarChar, SummaryTitle)
            .input('SummaryContent', sql.NVarChar, SummaryContent)
            .input('Actor', sql.NVarChar, Actor)
            .input('Director', sql.NVarChar, Director)
            .input('MovieGenre', sql.NVarChar, MovieGenre)
            .input('MovieImagePath', sql.NVarChar, MovieImagePath)
            .input('CategoryID', sql.Int, CategoryID)
            .input('SlugMovieName', sql.VarChar, SlugMovieName)
            .execute('SP_Admin')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}
// t thêm cái này nữa nè
exports.deleteMovieService = async (MovieID) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'deleteMovie')
            .input('MovieID', sql.Int, MovieID)
            .execute('SP_Admin');
        return result.recordset;
    } catch (error) {
        console.log(error);
        return null;
    }
}