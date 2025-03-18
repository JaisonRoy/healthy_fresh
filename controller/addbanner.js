var model = require("../model/addbanner");
var formidable = require("formidable");
var fs = require("fs");

module.exports.AddBanner = async (req, res) => {
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
            console.log(files.image);

            if (files) {
                var oldPath = files.image.filepath;
                var newPath =
                    process.cwd() +
                    "/Ajwa/uploads/banner/" +
                    files.image.originalFilename;
                let rawData = fs.readFileSync(oldPath);
                fs.writeFile(newPath, rawData, async function (err) {
                    if (err) console.log(err);
                    let filepathh =
                        "/Ajwauploads/banner/" + files.image.originalFilename;
                    let AddBanner = await model.AddBannerQuery(filepathh)
                    console.log(AddBanner.insertId, "AddBanner");

                })
                return res.send({
                    result: true,
                    message: "image upload successfully"
                });

            } else {
                return res.send({
                    result: true,
                    message: "image upload failed"
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