var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.AddBannerQuery = async (el) => {
    console.log(el);
    var Query = `insert into banner (b_image) values (?) `;
    var data = query(Query, [el]);
    return data;

}