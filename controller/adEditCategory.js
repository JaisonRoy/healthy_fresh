var model = require('../model/adEditCategory')
var formidable = require('formidable')
var fs = require('fs')
let path = require('path')

module.exports.EditCategory = async (req, res) => {
    try {
        var form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async function (err, fields, files) {
            if (err) {
                return res.send({
                    result: false,
                    message: "File upload failedm",
                    data: err
                })
            }

            let { c_id, c_name } = fields

            if (!c_id || c_name) {
                return res.send({
                    result: false,
                    message: " category id and name is required"
                })

            }

            let checkCategory = await model.CheckCatogory(c_id)
            if (checkCategory.length > 0) {

                let imagepath = ''
                console.log(files);

                if (files.c_image) {
                    const folderPath = path.join(process.cwd(), 'uploads', 'category');
                    if (!fs.existsSync(folderPath)) {
                        // Create the directory (and its parent directories if necessary)
                        fs.mkdirSync(folderPath, { recursive: true });
                    }
                    var oldPath = files.c_image.filepath;
                    var newpath = path.join(process.cwd() + "/uploads/category" + files.c_image.originalFilename);
                    let rawData = fs.readFileSync(oldPath);
                    fs.writeFile(newpath, rawData, async function (err) {
                        if (err) console.log(err)
                    })
                    imagepath = "uploads/category/" + files.c_image.originalFilename;


                    let EditCatogory = await model.EditCategory(c_name, imagepath, c_id)

                    if (EditCatogory.affectedRows > 0) {
                        return res.send({
                            result: true,
                            message: "Category Updated Sucessfully"
                        })
                    } else {
                        return res.send({
                            result: false,
                            message: "failed to update category"
                        })
                    }
                } else {
                    return res.send({
                        result: false,
                        message: "image is required"
                    })
                }


            }
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}