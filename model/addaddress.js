var db = require('../db/db');
var util = require('util');
var query = util.promisify(db.query).bind(db)

module.exports.AddAddress = async (u_id, name, email, mobile, address, city, zipcode) => {
    var Query = `insert into user_address (ua_u_id,ua_name,ua_email,ua_mobile,ua_address,ua_city,ua_zip_code) values (?,?,?,?,?,?,?)`;
    var data = query(Query, [u_id, name, email, mobile, address, city, zipcode])
    return data;
}

module.exports.CheckUser = async (u_id) => {
    var Query = `SELECT * FROM user where u_id =? `;
    var data = query(Query, [u_id]);
    return data;
}