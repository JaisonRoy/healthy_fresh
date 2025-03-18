var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.updateaddress = async (condition,ua_id) => {
    var Query = `update user_address ${condition} where ua_id = ?`;
    var data = await query(Query, [ua_id]);
    return data;
};