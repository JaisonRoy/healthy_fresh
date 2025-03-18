var model = require('../model/login');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.Login = async (req, res) => {
    try {
        var { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.send({
                result: false,
                message: "insucefficent parameter"
            })
        }
        SECRET_KEY = "dkjghkdghfhglknghdxlkdnflsfjopoijoigjhpokp"
        let checkuser = await model.CheckUSer(email, role);

        if (checkuser.length > 0) {

            let Checkpassword = await bcrypt.compare(password, checkuser[0].u_password);
            if (Checkpassword == true) {
                const payload = {
                    email: checkuser[0].u_email,
                    u_id: checkuser[0].u_id
                };
                const token = jwt.sign(payload, SECRET_KEY, {});
                return res.send({
                    result: true,
                    message: "logged in successfully",
                    u_id: checkuser[0].u_id,
                    name: checkuser[0].u_name,
                    email: checkuser[0].u_email,
                    mobile: checkuser[0].u_mobile,
                    user_token: token

                })

            } else {
                return res.send({
                    result: false,
                    message: "incorrect password,try again"
                })
            }

        } else {
            return res.send({
                result: false,
                message: "email is not registerd with us"
            })
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }

}