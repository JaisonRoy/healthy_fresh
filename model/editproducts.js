var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.CheckProductQuery = async (p_id) => {
    var Query = `select * from products where p_id= ?`;
    var data = query(Query, [p_id]);
    return data;
};

module.exports.ChangeProductInfo = async (condition, p_id) => {
    var Query = `update products ${condition} where p_id = ?`;
    var data = query(Query, [p_id]);
    return data;
};
module.exports.Updateimage = async (image, p_id) => {
    var Query = `update products set p_image = ?  where p_id = ? `;
    var data = query(Query, [image, p_id]);
    return data;
};
