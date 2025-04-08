var db = require('../db/db')
let util = require('util')
const query = util.promisify(db.query).bind(db)

module.exports.EditCategory = async (c_name, imagepath, c_id) => {
    let Query = `update category set c_name=?,c_image=? where c_id=?`
    let data = query(Query, [c_name, imagepath, c_id]);
    return data;
}

module.exports.CheckCatogory = async (c_id) => {
    let Query = `select * from category where c_id =?`
    let data = query(Query, [c_id])
    return data
}