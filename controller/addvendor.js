var model = require('../model/addvendor');


module.exports.AddVendor = async (req, res) => {
    try {
        var { name, mobile, address } = req.body

        if (!name || !mobile || !address) {
            return res.send({
                result: false,
                message: "insucefficent parameter"
            })
        }

        let addvendor = await model.AddVendor(name, mobile, address);
        if (addvendor.affectedRows > 0) {
            return res.send({
                result: true,
                message: "Vendor added successfully "
            })
        } else {
            return res.send({
                result: false,
                message: "Failed to add Vendor"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }
}