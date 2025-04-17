var model = require('../model/addaddress');


module.exports.AddAddress = async (req, res) => {
    try {
        var { name, email, mobile, address, state, district, city, landmark, zipcode, type } = req.body
        let u_id = req.user.u_id
        console.log(req.user, "jwt");

        if (!u_id || !name || !email || !mobile || !address || !state || !district || !city || !landmark || !zipcode || !type) {
            return res.send({
                result: false,
                message: "insucefficent parameter"
            })
        }
        let checkuser = await model.CheckUser(u_id);
        if (checkuser.length > 0) {

            let addaddress = await model.AddAddress(u_id, name, email, mobile, address, state, district, city, landmark, zipcode, type);
            if (addaddress.affectedRows > 0) {
                return res.send({
                    result: true,
                    message: "Address added successfully "
                })
            } else {
                return res.send({
                    result: false,
                    message: "Failed to add address"
                })
            }
        } else {
            return res.send({
                result: false,
                message: "User not found",
            });
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}