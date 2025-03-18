var model = require("../model/listcart");


module.exports.ListCart = async (req, res) => {
    try {
        var u_id = req.body.u_id;
        if (!u_id) {
            return res.send({
                result: false,
                message: "insucefficent parameter"
            })
        }
        let cartlist = await model.ListCartQuery(u_id);

        if (cartlist.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: cartlist,
            });
        } else {
            return res.send({
                result: false,
                message: "no product in cart",
            });
        }
    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });


    }
}