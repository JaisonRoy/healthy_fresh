var model = require('../model/editprofile')
var formidable = require('formidable')
var fs = require('fs')

module.exports.EditProfile = async (req, res) => {
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
            let { u_id, name, email, mobile } = fields
            if (!u_id || !name || !email || !mobile) {
                return res.send({
                    result: false,
                    messaage: "insufficient parameter"
                })
            }
            var checkuser = await model.CheckUserQuery(u_id)

            if (checkuser.length > 0) {

                let condition = ``;

                if (name) {
                    if (condition == '') {
                        condition = `set u_name ='${name}' `
                    } else {
                        condition += `,u_name='${name}'`
                    }
                }

                if (email) {
                    if (condition == '') {
                        condition = `set  u_email ='${email}' `
                    } else {
                        condition += `, u_email='${email}'`
                    }
                }
                if (mobile) {
                    if (condition == '') {
                        condition = `set  u_mobile ='${mobile}' `
                    } else {
                        condition += `, u_mobile='${mobile}'`
                    }
                }

                if (condition !== '') {
                    var Editprofile = await model.ChangeProfileInfo(condition, u_id)
                }

                // if (files.image) {
                //     var oldPath = files.image.filepath;
                //     var newPath =
                //         process.cwd() +
                //         "/uploads/profile/" + files.image.originalFilename
                //     let rawData = fs.readFileSync(oldPath);
                //     console.log(oldPath);

                //     fs.writeFileSync(newPath, rawData)
                //     var imagepath = "/uploads/profile/" + files.image.originalFilename
                // console.log(name, price, image, description, stocks, quantity, unit);

                // var Insertprofileimage = await model.Updateimage(imagepath, u_id)
                if (Editprofile.affectedRows) {
                    return res.send({
                        result: true,
                        message: "profile updated successfully"
                    })
                } else {
                    return res.send({
                        result: false,
                        message: "failed to update profile"
                    })
                }

                // } else {
                //     return res.send({
                //         result: false,
                //         message: "image is missing"
                //     })
                // }
            } else {
                return res.send({
                    result: false,
                    message: "user not found"
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

