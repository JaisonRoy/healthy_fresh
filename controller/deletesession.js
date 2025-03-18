var model = require("../model/deletesession");

module.exports.DeleteSection = async (req, res) => {

    try {
        var b_id = req.body.b_id;
        var p_id = req.body.p_id;
        var c_id = req.body.c_id;
        var ct_id = req.body.ct_id;
        var ua_id = req.body.ua_id;

        if (b_id) {
            var deletesection = await model.RemoveBannerQuery(b_id);
        }
        if (p_id) {
            var deletesection = await model.RemoveproductQuery(p_id);
        }
        if (c_id) {
            var deletesection = await model.RemoveCategoryQuery(c_id);
        }
        if (ct_id) {
            var deletesection = await model.RemoveCartQuery(ct_id);
        }
        if (ua_id) {
            var deletesection = await model.RemoveAddressQuery(ua_id);
        }


        if (deletesection.affectedRows > 0) {
            return res.send({
                result: true,
                message: "delete successfully"
            })
        } else {
            return res.send({
                result: false,
                message: "failed to delete"
            })
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }

}