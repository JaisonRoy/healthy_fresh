var model = require('../model/editvendor')

module.exports.EditAddress = async (req, res) => {
    try {
        let { v_id, name, mobile, address, v_products } = req.body
        if (!v_id) {
            return res.send({
                result: false,
                message: "Address id is required "
            })
        }
        let checkvendor = await model.CheckVendor(v_id)
        if (checkvendor.lenght == 0) {
            return res.send({
                result: false,
                message: "Vendor details not found"
            })
        }
        var condition = ''

        if (name) {
            if (condition == '') {
                condition = ` set v_name = '${name}'`
            } else {
                condition += ` , v_name = '${name}'`
            }
        }

        if (mobile) {
            if (condition == '') {
                condition = ` set v_mobile = '${mobile}'`
            } else {
                condition += ` , v_mobile = '${mobile}'`
            }
        }
        if (address) {
            if (condition == '') {
                condition = ` set v_address = '${address}'`
            } else {
                condition += ` , v_address = '${address}'`
            }
        }

        if (v_products) {
            if (condition == '') {
                condition = ` set v_products = '${v_products}'`
            } else {
                condition += ` , v_products = '${v_products}'`
            }
        }


        if (condition !== '') {
            let update = await model.updateVendor(condition, v_id)
            if (update.affectedRows > 0) {
                return res.send({
                    result: true,
                    message: "Vendor details updated successfully"
                })
            } else {
                return res.send({
                    result: false,
                    message: "failed to update Vendor details"
                })
            }

        } else {
            return res.send({
                result: false,
                message: "No data for update"
            })
        }


    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}