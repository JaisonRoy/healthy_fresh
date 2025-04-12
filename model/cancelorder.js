var db = require("../db/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);

module.exports.CheckUser = async (user_id) => {
    var Query = `select * from user where u_id = ? and u_status = 'active'`;
    var data = query(Query, [user_id]);
    return data;
};
module.exports.CheckOrder = async (order_id, user_id) => {
    var Query = `select * from orders where od_id = ? and u_id = ?`;
    var data = query(Query, [order_id, user_id]);
    return data;
};

module.exports.RemoveOrder = async (order_id) => {
    var Query = `UPDATE orders SET od_status = 'cancelled' WHERE od_id = ?`;
    var data = query(Query, [order_id]);
    return data;
};
module.exports.OrderProductDetails = async (order_id) => {
    var Query = `select * from order_product where op_order_id = ?`;
    var data = query(Query, [order_id]);
    return data;
}
module.exports.Getaddress = async (address_id) => {
    var Query = `select * from user_address where ua_id = ?`;
    var data = query(Query, [address_id]);
    return data;
}

module.exports.AddStock = async (quantity, product_id) => {
    var Query = `UPDATE products SET p_stocks = p_stocks + ${quantity} WHERE p_id = ?`;
    var data = query(Query, [product_id]);
    return data;
};