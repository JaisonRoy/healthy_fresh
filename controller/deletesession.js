var model = require("../model/deletesession");

module.exports.DeleteSection = async (req, res) => {

    try {
        var c_id = req.body.c_id;
        var b_id = req.body.b_id;
        var p_id = req.body.p_id;
        var ct_id = req.body.ct_id;
        var ua_id = req.body.ua_id;
        var u_id = req.body.u_id;
        var v_id = req.body.v_id;



        if (c_id) {
            let checkcategory = await model.CheckCategoryQuery(c_id);
            if (checkcategory.length == 0) {
                return res.send({
                    result: false,
                    message: "Category not found"
                });
            } else {

                var deletesection = await model.RemoveCategoryQuery(c_id);

            }
        }

        if (b_id) {
            let checkbanner = await model.CheckBannerQuery(b_id);
            if (checkbanner.length == 0) {
                return res.send({
                    result: false,
                    message: "banner not found"
                });
            } else {

                var deletesection = await model.RemoveBannerQuery(b_id);

            }
        }



        if (p_id) {
            let checkproduct = await model.CheckproductQuery(p_id);
            if (checkproduct.length == 0) {
                return res.send({
                    result: false,
                    message: "product not found"
                });
            } else {

                var deletesection = await model.RemoveproductQuery(p_id);

            }
        }
        if (ct_id) {
            let checkcart = await model.CheckCartQuery(ct_id);
            if (checkcart.length == 0) {
                return res.send({
                    result: false,
                    message: "cart details not found"
                });
            } else {

                var deletesection = await model.RemoveCartQuery(ct_id);

            }
        }

        if (ua_id) {
            let checkaddress = await model.CheckAddressQuery(ua_id);
            if (checkaddress.length == 0) {
                return res.send({
                    result: false,
                    message: "address not found"
                });
            } else {

                var deletesection = await model.RemoveAddressQuery(ua_id);

            }
        }

        if (u_id) {
            let checkuser = await model.CheckUserQuery(u_id);
            if (checkuser.length == 0) {
                return res.send({
                    result: false,
                    message: "user not found"
                });
            } else {

                var deletesection = await model.RemoveUserQuery(u_id);

            }
        }

        if (v_id) {
            let checkvendor = await model.CheckVendorQuery(v_id);
            if (checkvendor.length == 0) {
                return res.send({
                    result: false,
                    message: "vendor not found"
                });
            } else {

                var deletesection = await model.RemoveVendorQuery(v_id);

            }
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