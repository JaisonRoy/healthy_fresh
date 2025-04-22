var model = require('../model/listproducts');


module.exports.ListProducts = async (req, res) => {
    try {
        let { c_id, category_id, sub_category_id } = req.body;
        var condition = ""
        if (c_id) {
            condition = `WHERE p.p_id ='${c_id}'`
        } else if (category_id) {
            condition = `WHERE p.p_c_id ='${category_id}'`

        } else if (sub_category_id) {
            condition = `WHERE p.p_sub_c_id ='${sub_category_id}'`

        }
        var productlist = await model.ProductList(condition);
        // let data = await Promise.all(productlist.map(async = (el) => {
        //     let d_price = el.p_discount_price

        //     if (d_price === 0 || '') {
        //         el.p_discount_price = 'NULL'
        //     }
        //     return el
        // }))

        // console.log(productlist);

        if (productlist.length > 0) {
            return res.send({
                result: true,
                message: "data retrived",
                list: productlist
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
