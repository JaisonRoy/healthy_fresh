var model = require('../model/viewproduct');

module.exports.ViewProduct = async (req, res) => {
    try {
        var p_id = req.body.p_id;
        if (!p_id) {
            return res.send({
                result: false,
                message: "insucefficent parameter"
            })
        }
        let productview = await model.ProductView(p_id);

        var category_id = productview[0].p_c_id

        similar_products = await model.SimilarProducts(category_id)

        if (similar_products.length > 0) {
            return res.send({
                result: true,
                message: "data retrived",
                list: productview,
                similar: similar_products
            })

        } else {
            return res.send({
                result: false,
                message: "failed to retrive data"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}