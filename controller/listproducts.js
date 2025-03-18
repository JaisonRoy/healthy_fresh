var model = require('../model/listproducts');


module.exports.ListProducts = async (req, res) => {
    try {
        let c_id = req.body.c_id;
        var condition = ""
        if (c_id) {
            condition = `where c_id ='${c_id}'`
        }
        var categorylist = await model.ListCategory(condition);
        // console.log(categorylist);
        let arr = []

        let data = await Promise.all(
            categorylist.map(async el => {
                var obj = {}
                let category_id = el.c_id
                // console.log(category_id);
                var productlist = await model.ProductList(category_id);
                obj[el.c_name] = productlist
                // console.log(obj);
                arr.push(obj)


            })
        )
        // console.log(data);

        if (categorylist.length > 0) {
            return res.send({
                result: true,
                message: "data retrived",
                list: arr
            })
        } else {
            return res.send({
                result: false,
                message: " failed to retrive data"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}