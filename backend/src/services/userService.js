const connection = require("../configs/configDatabase");
const sql = require('mssql');

exports.getAllUsersService = async () => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getAllUsers')
            .execute('SP_Admin')
        return result.recordset
    } catch (error) {
        console.log(error);

    }
}

exports.getUserByIdService = async (id) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getUserById')
            .input('id', sql.Int, id)
            .execute('SP_Users')
        return result.recordset
    } catch (error) {
        console.log(error);

    }
}

exports.createUserService = async (email, name, role) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'createUser')
            .input('email', sql.VarChar, email)
            .input('name', sql.NVarChar, name)
            .input('role', sql.VarChar, role)
            .execute('SP_Admin')
        return result.recordset
    } catch (error) {
        console.log(error);

    }
}

exports.updateUserService = async (id, email, name, avatarUrl, role) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'updateUser')
            .input('id', sql.Int, id)
            .input('email', sql.VarChar, email)
            .input('name', sql.NVarChar, name)
            .input('avatarUrl', sql.VarChar, avatarUrl)
            .input('role', sql.VarChar, role)
            .execute('SP_Admin')
        return result.recordset
    } catch (error) {
        console.log(error);

    }
}

exports.deleteUserService = async (id) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'deleteUser')
            .input('id', sql.Int, id)
            .execute('SP_Admin')
        return result.recordset
    } catch (error) {
        console.log(error);

    }
}

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