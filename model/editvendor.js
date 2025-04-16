var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.updateVendor = async (condition, v_id) => {
    var Query = `update vendors ${condition} where v_id = ?`;
    var data = await query(Query, [v_id]);
    return data;
};

module.exports.CheckVendor = async (v_id) => {
    var Query = `select * from vendors where v_id = ?`;
    var data = await query(Query, [v_id]);
    return data;
};