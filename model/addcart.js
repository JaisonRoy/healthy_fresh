var db = require('../db/db');
var util = require('util');
var query = util.promisify(db.query).bind(db)

module.exports.AddToCart = async (u_id, p_id, quantity) => {
    var Query = `insert into cart (ct_u_id,ct_p_id,ct_quantity) values (?,?,?)`;
    var data = query(Query, [u_id, p_id, quantity])
    return data;
}

module.exports.CheckCart = async (u_id, p_id) => {
    var Query = `select * from cart where ct_u_id =? and ct_p_id=? `;
    var data = query(Query, [u_id, p_id])
    return data;
}
