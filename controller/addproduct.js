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
            var { category, subcategory, name, price, discount_price, unit, description, stocks } = fields;
            if (!category || !subcategory || !name || !price || !unit || !stocks) {
                return res.send({
                    result: false,
                    message: "insufficent parameter"
                })
            }

            var checkproduct = await model.CheckProduct(name)

            if (checkproduct.length == 0) {
                if (files.image) {
                    var oldPath = files.image.filepath;
                    var newPath =
                        process.cwd() +
                        "/uploads/product/" +
                        files.image.originalFilename;
                    let rawData = fs.readFileSync(oldPath);
                    fs.writeFile(newPath, rawData, async function (err) {
                        if (err) console.log(err);
                        let imagepath =
                            "/uploads/product/" + files.image.originalFilename;
                        let Addproduct = await model.AddProductQuery(category, subcategory, name, imagepath, price, discount_price, unit, description, stocks)
                        console.log(Addproduct.insertId, "Addproduct id");
                        console.log(Addproduct, "Addproduct");


                    })
                    return res.send({
                        result: true,
                        message: "product added successfully"
                    });

                } else {
                    return res.send({
                        result: true,
                        message: "image is required"
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