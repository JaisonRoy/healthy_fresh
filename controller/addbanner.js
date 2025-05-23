var model = require("../model/addbanner");
var formidable = require("formidable");
var fs = require("fs");
let { SendMessage } =require('../util/firebaseConfig')

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
            let { banner_description } = fields
            if (!banner_description) {
                return res.send({
                    result: false,
                    message: "please fill all the fields",
                });
            }
            if (files.image) {
                var oldPath = files.image.filepath;
                var newPath =
                    process.cwd() +
                    "/uploads/banner/" +
                    files.image.originalFilename;
                let rawData = fs.readFileSync(oldPath);
                fs.writeFile(newPath, rawData, async function (err) {
                    if (err) console.log(err);
                    let filepathh =
                        "/uploads/banner/" + files.image.originalFilename;
                    let AddBanner = await model.AddBannerQuery(filepathh, banner_description)
                    console.log(AddBanner.insertId, "AddBanner");
                    await SendMessage("New Offer", banner_description)

                })
                return res.send({
                    result: true,
                    message: "banner upload successfully"
                });

            } else {
                return res.send({
                    result: true,
                    message: "banner upload failed"
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