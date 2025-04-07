var model = require('../model/adminlogin');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.AdminLogin = async (req, res) => {
    try {
        var { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.send({
                result: false,
                message: "insucefficent parameter"
            })
        }
        var SECRET_KEY = process.env.SECRET_KEY
        let checkuser = await model.CheckAdmin(email, role);

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
                    email: checkuser[0].u_email,
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