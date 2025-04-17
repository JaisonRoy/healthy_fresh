var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.CheckproductQuery = async (p_id) => {
    var Query = `select * from products where p_id = ?`;
    var data = await query(Query, [p_id]);
    return data;
};
module.exports.RemoveproductQuery = async (p_id) => {
    var Query = `DELETE FROM products WHERE p_id=?`;
    var data = await query(Query, [p_id]);
    return data;
};
//------------------------------

module.exports.CheckBannerQuery = async (b_id) => {
    var Query = `select * from banner where b_id = ?`;
    var data = await query(Query, [b_id]);
    return data;
};
module.exports.RemoveBannerQuery = async (b_id) => {
    var Query = `DELETE FROM banner WHERE b_id=?`;
    var data = await query(Query, [b_id]);
    return data;
};
//-------------------------------
module.exports.CheckCategoryQuery = async (c_id) => {
    var Query = `select * from category where c_id = ?`;
    var data = await query(Query, [c_id]);
    return data;
};
module.exports.RemoveCategoryQuery = async (c_id) => {
    var Query = `DELETE FROM category WHERE c_id=?`;
    var data = await query(Query, [c_id]);
    return data;
};
//--------------------------------------
module.exports.CheckCartQuery = async (ct_id) => {
    var Query = `select * from cart where ct_id = ?`;
    var data = await query(Query, [ct_id]);
    return data;
};
module.exports.RemoveCartQuery = async (ct_id) => {
    var Query = `DELETE FROM cart WHERE ct_id=?`;
    var data = await query(Query, [ct_id]);
    return data;
};

//----------------------------------------------

module.exports.CheckAddressQuery = async (ua_id) => {
    var Query = `select * from user_address where ua_id = ?`;
    var data = await query(Query, [ua_id]);
    return data;
}
module.exports.RemoveAddressQuery = async (ua_id) => {
    var Query = `DELETE FROM user_address WHERE ua_id=?`;
    var data = await query(Query, [ua_id]);
    return data;
};
//------------------------------------------------------

module.exports.CheckUserQuery = async (u_id) => {
    var Query = `select * from user where u_id = ?`;
    var data = await query(Query, [u_id]);
    return data;
}
module.exports.RemoveUserQuery = async (u_id) => {
    var Query = `DELETE FROM user WHERE u_id=?`;
    var data = await query(Query, [u_id]);
    return data;
};
//------------------------------------------------------

module.exports.CheckVendorQuery = async (v_id) => {
    var Query = `select * from vendors where v_id = ?`;
    var data = await query(Query, [v_id]);
    return data;
}
module.exports.RemoveVendorQuery = async (v_id) => {
    var Query = `DELETE FROM vendors WHERE v_id=?`;
    var data = await query(Query, [v_id]);
    return data;
};
//------------------------------------------------------

module.exports.CheckOrderQuery = async (od_id) => {
    var Query = `select * from orders where od_id = ?`;
    var data = await query(Query, [od_id]);
    return data;
}
module.exports.RemoveOrderQuery = async (od_id) => {
    var Query = `DELETE FROM orders WHERE od_id=?`;
    var data = await query(Query, [od_id]);
    return data;
};

module.exports.RemoveOrdeProductQuery = async (od_id) => {
    var Query = `DELETE FROM order_product WHERE op_order_id=?`;
    var data = await query(Query, [od_id]);
    return data;
};
//------------------------------------------------------