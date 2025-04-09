var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.AddSubCategoryQuery = async (name, imagepath, category_id) => {
    var Query = `insert into sub_category (sc_name,sc_image,sc_category_id) values (?,?,?) `;
    var data = query(Query, [name, imagepath, category_id]);
    return data;
}

module.exports.CheckAlreadyExists = async (name) => {
    var Query = `select * from sub_category where sc_name = ?`
    return await query(Query, [name])
}

module.exports.FindSubCategory = async (subCategory_id) => {
    var Query = `select * from sub_category where sc_id=?`
    return await query(Query, [subCategory_id])
}

module.exports.UpdateSubCategoryData = async (name, imagepath, category_id, subCategory_id) => {
    let Query = `update sub_category set sc_name=?,sc_image=?,sc_category_id=? where sc_id=?`
    return await query(Query, [name, imagepath, category_id, subCategory_id])
}

module.exports.ListAllSubcategories = async (condition) => {
    let Query = `select * from sub_category ${condition}`
    return await query(Query)
}

module.exports.DeleteSubCategory = async (subCategory_id) => {
    let Query = `delete from sub_category where sc_id=?`
    return await query(Query, [subCategory_id])
}