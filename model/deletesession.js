var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.RemoveproductQuery = async (p_id) => {
    var Query = `DELETE FROM products WHERE p_id=?`;
    var data = await query(Query, [p_id]);
    return data;
};
module.exports.RemoveBannerQuery = async (b_id) => {
    var Query = `DELETE FROM banner WHERE b_id=?`;
    var data = await query(Query, [b_id]);
    return data;
};
module.exports.RemoveCategoryQuery = async (c_id) => {
    var Query = `DELETE FROM category WHERE c_id=?`;
    var data = await query(Query, [c_id]);
    return data;
};
module.exports.RemoveCartQuery = async (ct_id) => {
    var Query = `DELETE FROM cart WHERE ct_id=?`;
    var data = await query(Query, [ct_id]);
    return data;
};
module.exports.RemoveAddressQuery = async (ua_id) => {
    var Query = `DELETE FROM user_address WHERE ua_id=?`;
    var data = await query(Query, [ua_id]);
    return data;
};