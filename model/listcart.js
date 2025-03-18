var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListCartQuery = async (u_id) => {
    var Query = `SELECT * FROM cart c INNER JOIN products p ON c.ct_p_id = p.p_id WHERE c.ct_u_id = ? `;
    var data = query(Query, [u_id]);
    return data;

}
