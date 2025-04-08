var model = require("../model/subCategory");
var formidable = require("formidable");
var fs = require("fs");

module.exports.AddSubCategory = async (req, res) => {
    try {
        var form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async function (err, fields, files) {
            if (err) {
                return res.send({
                    result: false,
                    message: "File Upload Failed!",
                    data: err,
                });
            }
            var { name, category_id } = fields;
            if (!name || !category_id) {
                return res.send({
                    result: false,
                    message: "insucefficent parameter"
                })
            }
            let categoryExist = await model.CheckAlreadyExists(name)
            if (categoryExist.length>0) {
                return res.send({
                    result: false,
                    message: "Category already exist with same name"
                })
            }
            let imagepath = null
            if (files.image) {
                var oldPath = files.image.filepath;
                var newPath =
                    process.cwd() +
                    "/uploads/category/" +
                    files.image.originalFilename;
                let rawData = fs.readFileSync(oldPath);
                fs.writeFile(newPath, rawData, async function (err) {
                    if (err) console.log(err);
                })
                imagepath = "uploads/category/" + files.image.originalFilename;
            }
            let AddSubcategory = await model.AddSubCategoryQuery(name, imagepath, category_id)
            if (AddSubcategory.affectedRows > 0) {
                return res.send({
                    result: true,
                    message: "Sub category created succesfully"
                })
            } else {
                return res.send({
                    result: false,
                    message: "Failed to create sub category"
                });
            }
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message,
        });
    }
}

module.exports.EditSubCategory = async (req, res) => {
    try {
        let form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async function (err, fields, files) {
            if (err) {
                return res.send({
                    result: false,
                    message: "File Upload Failed!",
                    data: err,
                });
            }
            var { subCategory_id, name, category_id } = fields;
            if (!subCategory_id || !name || !category_id) {
                return res.send({
                    result: false,
                    message: "insucefficent parameter"
                })
            }
            let findSubCategory = await model.FindSubCategory(subCategory_id)
            if (findSubCategory.length === 0) {
                return res.send({
                    result: false,
                    message: "No subcategory found"
                })
            }
            let categoryExist = await model.CheckAlreadyExists(name)
            if (categoryExist.length > 0) {
                return res.send({
                    result: false,
                    message: "Category already exist"
                })
            }
            let imagepath = null
            if (files.image) {
                var oldPath = files.image.filepath;
                var newPath =
                    process.cwd() +
                    "/uploads/category/" +
                    files.image.originalFilename;
                let rawData = fs.readFileSync(oldPath);
                fs.writeFile(newPath, rawData, async function (err) {
                    if (err) console.log(err);
                })
                imagepath = "uploads/category/" + files.image.originalFilename;
            }
            let AddSubcategory = await model.UpdateSubCategoryData(name, imagepath, category_id, subCategory_id)
            if (AddSubcategory.affectedRows > 0) {
                return res.send({
                    result: true,
                    message: "Sub category edited succesfully"
                })
            } else {
                return res.send({
                    result: false,
                    message: "Failed to edit sub category"
                });
            }
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


module.exports.ListSubCategory = async (req, res) => {
    try {
        let subCategories = await model.ListAllSubcategories()
        if (subCategories.length > 0) {
            return res.send({
                result: true,
                message: "Successfully fetched data",
                data: subCategories
            })
        } else {
            return res.send({
                result: false,
                message: "Failed to fetch data"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}

module.exports.DeleteSubCategory = async (req, res) => {
    try {
        let { subcategory_id } = req.body
        if (!subcategory_id) {
            return res.send({
                result: false,
                message: "Sub category id is required"
            })
        }
        let deletedData = await model.DeleteSubCategory(subcategory_id)
        if (deletedData.affectedRows > 0) {
            return res.send({
                result: true,
                message: "Sub category deleted successfully"
            })
        } else {
            return res.send({
                result: false,
                message: "Failed to delete sub category "
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}