var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListAddressQuery = async (u_id) => {
    var Query = `SELECT * FROM user_address where ua_u_id =? `;
    var data = query(Query, [u_id]);
    return data;
};
module.exports.CheckUser = async (u_id) => {
    var Query = `SELECT * FROM user where u_id =? `;
    var data = query(Query, [u_id]);
    return data;
}

