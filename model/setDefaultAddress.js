var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.CheckAddress = async (ua_id, user_id) => {
    var Query = `select * from user_address where ua_id  = ? and ua_u_id=?`
    return await query(Query, [ua_id, user_id])
}

module.exports.GetdefaultAddress = async (user_id) => {
    var Query = `select * from user_address where ua_u_id  = ? and ua_default_address=1`
    return await query(Query, [user_id])
}

module.exports.RemoveDefaultAddress = async (ua_id) => {
    let Query = `update user_address set ua_default_address=0 where ua_id=?`
    return await query(Query, [ua_id])
}

module.exports.SetDefaultAddress = async (ua_id) => {
    let Query = `update user_address set ua_default_address=1 where ua_id=?`
    return await query(Query, [ua_id])
}

