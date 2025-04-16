var model = require("../model/listvendors");


module.exports.ListVendors = async (req, res) => {
    try {
        var { v_id } = req.headers;
        let condition = ''
        if (v_id) {
            condition = `where v_id = '${v_id}'`
        }
        let vendorlist = await model.ListVendors(condition);

        if (vendorlist.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: vendorlist,
            });
        } else {
            return res.send({
                result: false,
                message: "vendor not found",
            });
        }
    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });


    }
}