var db = require("../db/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);

module.exports.CheckAdmin = async (email, role) => {
    var Query = `select * from user where u_email = ? and u_role=?`;
    var data = query(Query, [email, role]);
    return data;
};

