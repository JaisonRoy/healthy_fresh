var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.updateaddress = async (condition, ua_id) => {
    var Query = `update user_address ${condition} where ua_id = ?`;
    var data = await query(Query, [ua_id]);
    return data;
};

module.exports.CheckAddress = async (ua_id, u_id) => {
    var Query = `select * from user_address where ua_id = ? and ua_u_id =? `;
    var data = await query(Query, [ua_id, u_id]);
    return data;
};