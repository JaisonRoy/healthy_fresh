var model = require("../model/listorder");

module.exports.ListOrder = async (req, res) => {
    try {

        var u_id = req.body.u_id;

        condition = ''
        if (u_id) {
            condition = `and u_id ='${u_id}'`
        }

        let Orderlist = await model.ListOrderQuery(condition);

        if (Orderlist.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: Orderlist,
            });
        } else {
            return res.send({
                result: false,
                message: "data not found",
            });
        }
    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });


    }
}