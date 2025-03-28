var model = require('../model/editproducts')
var formidable = require('formidable')
var fs = require('fs')

module.exports.EditProduct = async (req, res) => {
    try {
        var form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async function (err, fields, files) {
            if (err) {
                return res.send({
                    result: false,
                    message: "File Upload Failed!",
                    data: err,
                });
            }
            let { p_id, category, name, price, discount_price, description, stocks } = fields
            if (!p_id || !category || !name || !price || !discount_price || !description || !stocks) {
                return res.send({
                    result: false,
                    messaage: "insufficient parameter"
                })
            }
            var checkproduct = await model.CheckProductQuery(p_id)

            if (checkproduct.length > 0) {

                let condition = ``;
                if (category) {
                    if (condition == '') {
                        condition = `set p_c_id='${category}' `
                    } else {
                        condition += `,p_c_id='${category}'`
                    }
                }
                if (name) {
                    if (condition == '') {
                        condition = `set p_name ='${name}' `
                    } else {
                        condition += `,p_name='${name}'`
                    }
                }

                if (price) {
                    if (condition == '') {
                        condition = `set p_orgianl_price ='${price}' `
                    } else {
                        condition += `,p_orgianl_price='${price}'`
                    }
                }
                if (discount_price) {
                    if (condition == '') {
                        condition = `set p_discount_price ='${discount_price}' `
                    } else {
                        condition += `,p_discount_price='${discount_price}'`
                    }
                }
                if (description) {
                    if (condition == '') {
                        condition = `set p_description ='${description}' `
                    } else {
                        condition += `,p_description='${description}'`
                    }
                }
                if (stocks) {
                    if (condition == '') {
                        condition = `set p_stocks ='${stocks}' `
                    } else {
                        condition += `,p_stocks='${stocks}'`
                    }
                }

                if (condition !== '') {
                    var Editproduct = await model.ChangeProductInfo(condition, p_id)
                }
                if (Editproduct) {



                    if (files.image) {
                        var oldPath = files.image.filepath;
                        var newPath =
                            process.cwd() +
                            "/uploads/product/" + files.image.originalFilename
                        let rawData = fs.readFileSync(oldPath);
                        console.log(oldPath);

                        fs.writeFileSync(newPath, rawData)
                        var image = "/uploads/product/" + files.image.originalFilename
                        // console.log(name, price, image, description, stocks, quantity, unit);

                        var Insertproductimage = await model.Updateimage(image, p_id)
                        if (Insertproductimage.affectedRows) {
                            return res.send({
                                result: true,
                                message: "product updated successfully"
                            })
                        } else {
                            return res.send({
                                result: false,
                                message: "failed to update product"
                            })
                        }

                    }
                    return res.send({
                        result: true,
                        message: "product updated successfully"
                    })
                } else {
                    return res.send({
                        result: false,
                        message: "failed to update product"
                    })
                }
            } else {
                return res.send({
                    result: false,
                    message: "product does not exists"
                })
            }
        })

    } catch
    (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}

