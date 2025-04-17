var db = require("../db/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);

module.exports.CheckUSer = async (email, role) => {
    var Query = `select * from user where u_email = ? and u_role =?`;
    var data = query(Query, [email, role]);
    return data;
};

module.exports.CheckUserLogin = async (u_id, role) => {
    var Query = `select u_fcm_token from user where u_id = ? and u_role =?`;
    var data = query(Query, [u_id, role]);
    return data;
};

module.exports.UpdateUserToken = async (fcm_token, u_id, role) => {
    var Query = `update user set u_fcm_token =? where u_id = ? and u_role =?`;
    var data = query(Query, [fcm_token, u_id, role]);
    return data;
};

