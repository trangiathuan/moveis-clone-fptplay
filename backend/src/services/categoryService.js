const connection = require("../configs/configDatabase");
const sql = require('mssql');

exports.getCategoryService = async () => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'getCategory')
            .execute('SP_Admin')
        return result.recordset;
    } catch (error) {
        console.log(error);

    }
}

exports.createCategoryService = async (categoryName, slugCatrgoryName) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'createCategory')
            .input('CategoryName', sql.NVarChar, categoryName)
            .input('SlugCategoryName', sql.VarChar, slugCatrgoryName)
            .execute('SP_Admin')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

exports.updateCategoryService = async (categoryName, slugCatrgoryName, CategoryID) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'updateCategory')
            .input('CategoryID', sql.Int, CategoryID)
            .input('CategoryName', sql.NVarChar, categoryName)
            .input('SlugCategoryName', sql.VarChar, slugCatrgoryName)
            .execute('SP_Admin')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}

exports.deleteCategoryService = async (CategoryID) => {
    try {
        const pool = await connection();
        const result = await pool.request()
            .input('action', sql.VarChar, 'deleteCategory')
            .input('CategoryID', sql.Int, CategoryID)
            .execute('SP_Admin')
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
}