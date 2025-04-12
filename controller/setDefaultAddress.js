var model = require('../model/setDefaultAddress');

module.exports.SetDefultAddress = async (req, res) => {
    try {
        var { ua_id, user_id } = req.body

        if (!ua_id || !user_id) {
            return res.send({
                result: false,
                message: "insucefficent parameter"
            })
        }
        let checkaddress = await model.CheckAddress(ua_id, user_id);
        if (checkaddress.length > 0) {

            let getdefaultaddress = await model.GetdefaultAddress(user_id);

            if (getdefaultaddress.length > 0) {
                let removedefaultaddress = await model.RemoveDefaultAddress(getdefaultaddress[0]?.ua_id)
            }

            let setdefaultaddress = await model.SetDefaultAddress(ua_id);
            if (setdefaultaddress.affectedRows > 0) {
                return res.send({
                    result: true,
                    message: "Default Address set successfully "
                })
            } else {
                return res.send({
                    result: false,
                    message: "Failed to set Default Address"
                })
            }

        } else {
            return res.send({
                result: false,
                message: "Addrerss not found",
            });
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}