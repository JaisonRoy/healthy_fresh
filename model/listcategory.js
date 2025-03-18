var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListCategoryQuery = async () => {
    var Query = `SELECT * FROM category  `;
    var data = query(Query);
    return data;

}
