var db = require('../db/db');
var util = require('util');
var query = util.promisify(db.query).bind(db)

module.exports.ListCategory = async (condition) => {
    var Query = `select * from category ${condition}`;
    var data = query(Query)
    return data;
}

module.exports.ProductList = async (category_id) => {
    var Query = `select * from products where p_c_id = ?`;
    var data = query(Query, [category_id])
    return data;
}
