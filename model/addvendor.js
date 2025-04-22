var db = require('../db/db');
var util = require('util');
var query = util.promisify(db.query).bind(db)

module.exports.AddVendor = async (name, mobile, address, products) => {
    var Query = `insert into vendors (v_name, v_mobile, v_address,v_products) values (?,?,?,?)`;
    var data = query(Query, [name, mobile, address, products])
    return data;
}
