var db = require('../db/db');
var util = require('util');
var query = util.promisify(db.query).bind(db)

module.exports.ListCategory = async (condition) => {
    var Query = `select * from category ${condition}`;
    var data = query(Query)
    return data;
}

module.exports.ProductList = async (condition) => {
    var Query = `SELECT p.*,c.*,sc.*
FROM products p
LEFT JOIN category c ON p.p_c_id = c.c_id
LEFT JOIN sub_category sc ON p.p_sub_c_id = sc.sc_id  ${condition}`;
    var data = query(Query, [condition])
    return data;
}
