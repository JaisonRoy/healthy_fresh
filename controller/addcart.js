var model = require('../model/addcart');

module.exports.AddCart = async (req, res) => {
    try {
        var { u_id, p_id, quantity } = req.body

        if (!u_id || !p_id) {
            return res.send({
                result: false,
                message: "insucefficent parameter"
            })
        }
        let checkcart = await model.CheckCart(u_id, p_id)
        console.log(checkcart);

        if (checkcart.length == 0) {
            addtocart = await model.AddToCart(u_id, p_id, quantity);
            if (addtocart.affectedRows > 0) {
                return res.send({
                    result: true,
                    message: "product added to cart"
                })
            } else {
                return res.send({
                    result: false,
                    message: "failed to add product to cart"
                })
            }
        } else {
            return res.send({
                result: false,
                message: "product already added to cart"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}