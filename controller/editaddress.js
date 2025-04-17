var model = require('../model/editaddress')

module.exports.EditAddress = async (req, res) => {
    try {
        let { ua_id, name, email, mobile, address, state, district, city, landmark, zipcode } = req.body
        if (!ua_id) {
            return res.send({
                result: false,
                message: "Address id is required "
            })
        }
        var condition = ''
        if (name) {
            if (condition == '') {
                condition = ` set ua_name = '${name}'`
            } else {
                condition += ` , ua_name = '${name}'`
            }
        }
        if (email) {
            if (condition == '') {
                condition = ` set ua_email = '${email}'`
            } else {
                condition += ` , ua_email = '${email}'`
            }
        }
        if (mobile) {
            if (condition == '') {
                condition = ` set ua_mobile = '${mobile}'`
            } else {
                condition += ` , ua_mobile = '${mobile}'`
            }
        }
        if (address) {
            if (condition == '') {
                condition = ` set ua_address = '${address}'`
            } else {
                condition += ` , ua_address = '${address}'`
            }
        }
        if (state) {
            if (condition == '') {
                condition = ` set ua_state = '${state}'`
            } else {
                condition += ` , ua_state = '${state}'`
            }
        }
        if (district) {
            if (condition == '') {
                condition = ` set ua_district = '${district}'`
            } else {
                condition += ` , ua_district = '${district}'`
            }
        }
        if (city) {
            if (condition == '') {
                condition = ` set ua_city = '${city}'`
            } else {
                condition += ` , ua_city = '${city}'`
            }
        }
        if (landmark) {
            if (condition == '') {
                condition = ` set ua_landmark = '${landmark}'`
            } else {
                condition += ` , ua_landmark = '${landmark}'`
            }
        }
        if (zipcode) {
            if (condition == '') {
                condition = ` set ua_zip_code = '${zipcode}'`
            } else {
                condition += ` , ua_zip_code = '${zipcode}'`
            }
        }

        if (condition !== '') {
            let update = await model.updateaddress(condition, ua_id)
            if (update.affectedRows > 0) {
                return res.send({
                    result: true,
                    message: "address updated successfully"
                })
            } else {
                return res.send({
                    result: false,
                    message: "failed to update address"
                })
            }

        } else {
            return res.send({
                result: false,
                message: "nothing for update"
            })
        }


    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}