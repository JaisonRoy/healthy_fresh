var model = require("../model/addcategory");
var formidable = require("formidable");
var fs = require("fs");

module.exports.AddCategory = async (req, res) => {
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
            var { c_name } = fields;
            if (!c_name) {
                return res.send({
                    result: false,
                    message: "insucefficent parameter"
                })
            }
            console.log(files.image);

            if (files) {
                var oldPath = files.image.filepath;
                var newPath =
                    process.cwd() +
                    "/uploads/category/" +
                    files.image.originalFilename;
                let rawData = fs.readFileSync(oldPath);
                fs.writeFile(newPath, rawData, async function (err) {
                    if (err) console.log(err);
                    let imagepath =
                        "uploads/category/" + files.image.originalFilename;
                    let Addcategory = await model.AddCategoryQuery(c_name, imagepath)
                    console.log(Addcategory.insertId, "Addcategory");

                })
                return res.send({
                    result: true,
                    message: "category added successfully"
                });

            } else {
                return res.send({
                    result: true,
                    message: "category added failed"
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