var model = require("../model/addproduct");
var formidable = require("formidable");
var fs = require("fs");

module.exports.AddProducts = async (req, res) => {
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
            var { category, name, price, discount_price, description, stocks } = fields;
            if (!category || !name || !price || !discount_price || !description || !stocks) {
                return res.send({
                    result: false,
                    message: "insufficent parameter"
                })
            }


            var checkproduct = await model.CheckProduct(name)


            if (checkproduct.length == 0) {
                if (files) {
                    var oldPath = files.image.filepath;
                    var newPath =
                        process.cwd() +
                        "/Ajwa/uploads/products/" +
                        files.image.originalFilename;
                    let rawData = fs.readFileSync(oldPath);
                    fs.writeFile(newPath, rawData, async function (err) {
                        if (err) console.log(err);
                        let imagepath =
                            "/Ajwa/uploads/products/" + files.image.originalFilename;
                        let Addproduct = await model.AddProductQuery(category, name, imagepath, price, discount_price, description, stocks)
                        console.log(Addproduct.insertId, "Addproduct");

                    })
                    return res.send({
                        result: true,
                        message: "product added successfully"
                    });

                } else {
                    return res.send({
                        result: true,
                        message: "failed to add product"
                    })

                }
            } else {
                return res.send({
                    result: false,
                    message: "this product is already existed"
                })
            }

        })

    } catch (error) {
        console.log(error);
        return res.send({
            result: false,
            message: error.message,
        });
    }

}