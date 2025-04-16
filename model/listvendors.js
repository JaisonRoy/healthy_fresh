var db = require('../db/db');
var util = require('util');
var query = util.promisify(db.query).bind(db)

module.exports.ListVendors = async (condition) => {
    var Query = `select * from vendors ${condition}`;
    var data = query(Query)
    return data;
}
