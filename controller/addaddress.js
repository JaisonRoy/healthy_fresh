var model = require('../model/addaddress');


module.exports.AddAddress = async (req, res) => {
    try {
        var { u_id, name, email, mobile, address, city, zipcode } = req.body

        if (!u_id || !name || !email || !mobile || !address || !city || !zipcode) {
            return res.send({
                result: false,
                message: "insucefficent parameter"
            })
        }
        let checkuser = await model.CheckUser(u_id);
        if (checkuser.length > 0) {


            addaddress = await model.AddAddress(u_id, name, email, mobile, address, city, zipcode);
            if (addaddress.affectedRows > 0) {
                return res.send({
                    result: true,
                    message: "address added "
                })
            } else {
                return res.send({
                    result: false,
                    message: "failed to add address"
                })
            }
        } else {
            return res.send({
                result: false,
                message: "user not found",
            });
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}