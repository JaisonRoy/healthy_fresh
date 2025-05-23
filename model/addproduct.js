var db = require('../db/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.AddProductQuery = async (category, subcategory, name, imagepath, price, discount_price, unit, description, stocks) => {
    var Query = `insert into products ( p_c_id ,p_sub_c_id,p_name, p_image, p_orgianl_price, p_discount_price,p_unit, p_description,p_stocks) values (?,?,?,?,?,?,?,?,?)`;
    var data = query(Query, [category, subcategory, name, imagepath, price, discount_price, unit, description, stocks]);
    return data;
}

module.exports.CheckProduct = async (name) => {
    var Query = `select * from products where lower(p_name)= ?`;
    var data = query(Query, [name.toLowerCase()]);
    return data;
};