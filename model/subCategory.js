var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.AddSubCategoryQuery = async (name, imagepath, category_id) => {
    var Query = `insert into sub_category (name,image,category_id) values (?,?,?) `;
    var data = query(Query, [name, imagepath, category_id]);
    return data;
}

module.exports.CheckAlreadyExists = async (name) => {
    var Query = `select * from sub_category where name = ?`
    return await query(Query, [name])
}

module.exports.FindSubCategory = async (subCategory_id) => {
    var Query = `select * from sub_category where id=?`
    return await query(Query, [subCategory_id])
}

module.exports.UpdateSubCategoryData = async (name, imagepath, category_id, subCategory_id) => {
    let Query = `update sub_category set name=?,image=?,category_id=? where id=?`
    return await query(Query, [name, imagepath, category_id, subCategory_id])
}

module.exports.ListAllSubcategories = async () => {
    let Query = `select * from sub_category`
    return await query(Query)
}

module.exports.DeleteSubCategory = async (subCategory_id) => {
    let Query = `delete from sub_category where id=?`
    return await query(Query, [subCategory_id])
}