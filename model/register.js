var db = require('../db/db')
var util = require("util");
var query = util.promisify(db.query).bind(db)

module.exports.CheckmailQuery = async (email) => {
    var Query = `select * from user where u_email = ?`;
    var data = query(Query, [email])
    return data;
}

module.exports.InsertUserQuery = async (name, email, password) => {
    var Query = `insert into user(u_name,u_email,u_password) values (?,?,?) `;
    var data = await query(Query, [name, email, password])
    return data
}