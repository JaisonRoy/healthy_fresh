var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.AddCategoryQuery = async (c_name, imagepath) => {
    var Query = `insert into category (c_name,c_image) values (?,?) `;
    var data = query(Query, [c_name, imagepath]);
    return data;

}