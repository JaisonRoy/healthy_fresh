var db = require('../db/db');
var util = require('util');
var query = util.promisify(db.query).bind(db)

module.exports.ListUsers = async (condition) => {
    var Query = `select * from user ${condition}`;
    var data = query(Query)
    return data;
}
