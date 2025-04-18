
const categoryService = require('../services/categoryService')

function toSlug(str) {
    return str
        .normalize('NFD')                     // tách dấu khỏi chữ
        .replace(/[\u0300-\u036f]/g, '')      // xóa dấu
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')         // xóa ký tự đặc biệt
        .trim()
        .replace(/\s+/g, '-');                // thay khoảng trắng bằng -
}

exports.getCategoryController = async (req, res) => {
    const result = await categoryService.getCategoryService();

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        });
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        })
    }
}

exports.createCategoryController = async (req, res) => {
    const { categoryName } = req.body
    const slugCatrgoryName = toSlug(categoryName)
    console.log('Data sent to server:', categoryName, slugCatrgoryName);

    const result = await categoryService.createCategoryService(categoryName, slugCatrgoryName);

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Thêm danh mục thành công',
            Data: result
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Danh mục đã tồn tại',
            Data: null
        });
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Danh mục đã tồn tại',
            Data: null
        })
    }
}

exports.updateCategoryController = async (req, res) => {
    const { CategoryName, CategoryID } = req.body
    const slugCatrgoryName = toSlug(CategoryName)
    console.log('data sent to server:', CategoryName, '-', CategoryID, '-', slugCatrgoryName);

    const result = await categoryService.updateCategoryService(CategoryName, slugCatrgoryName, CategoryID);

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Cập nhật thành công',
            Data: result
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Cập nhật thất bại',
            Data: null
        });
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Cập nhật thất bại',
            Data: null
        })
    }
}

exports.deleteCategoryController = async (req, res) => {
    const { CategoryID } = req.body
    console.log('data sent to server:', CategoryID);

    const result = await categoryService.deleteCategoryService(CategoryID);

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xóa danh mục thành công',
            Data: result
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Xóa danh mục thất bại',
            Data: null
        });
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Xóa danh mục thất bại',
            Data: null
        })
    }
}