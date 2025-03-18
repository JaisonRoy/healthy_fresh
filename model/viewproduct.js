var db = require('../db/db');
var util = require('util');
var query = util.promisify(db.query).bind(db)

module.exports.SimilarProducts = async (category_id) => {
    var Query = `select * from products where p_c_id = ?`;
    var data = query(Query, [category_id])
    return data;
}

module.exports.ProductView = async (p_id) => {
    var Query = `select * from products where p_id = ?`;
    var data = query(Query, [p_id])
    return data;
}
