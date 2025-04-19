var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.AddBannerQuery = async (filepathh, banner_description) => {
    var Query = `insert into banner (b_image,b_description) values (?,?) `;
    var data = query(Query, [filepathh, banner_description]);
    return data;
}