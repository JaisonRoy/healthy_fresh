var model = require('../model/register');
var bcrypt = require('bcrypt')


module.exports.Register = async (req, res) => {
    try {
        var { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.send({
                result: false,
                message: "insucefficent parametert"
            })
        }

        let checkmail = await model.CheckmailQuery(email);
        if (checkmail.length > 0) {
            return res.send({
                result: false,
                message: "already registered with same email"
            })
        } else {
            var hashedpassword = await bcrypt.hash(password, 10)
            let insertuser = await model.InsertUserQuery(name, email, hashedpassword);

            if (insertuser.affectedRows > 0) {
                return res.send({
                    result: true,
                    message: "registration succesfull"
                })
            } else {
                return res.send({
                    result: false,
                    message: "failed to register"
                })
            }
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}