var db = require("../db/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);

module.exports.CheckEmailQuery = async (email, role) => {
    var Query = `select * from user where u_email =? and u_role = ?`;
    var data = await query(Query, [email, role]);
    return data;
};

module.exports.UpdatePassword = async (password, u_id) => {
    var Query = `update user set u_password=? where u_id =?`;
    var data = await query(Query, [password, u_id]);
    return data;
};

module.exports.StoreResetToken = async (token, expirationDate, u_id) => {
    var Query = `UPDATE user SET u_token = ?, u_token_expiry = ? WHERE u_id = ?`;
    var data = await query(Query, [token, expirationDate, u_id]);
    return data;
};

module.exports.ValidateResetToken = async (u_id, token) => {
    var Query = `SELECT u_token, u_token_expiry FROM user WHERE u_id = ? AND u_token = ?`;
    var data = await query(Query, [u_id, token]);
    return data;
};