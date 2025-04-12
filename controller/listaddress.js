var model = require("../model/listaddress");


module.exports.ListAddress = async (req, res) => {
    try {
        let u_id = req.body.u_id;
        if (!u_id) {
            return res.send({
                result: false,
                message: "user id is required"
            })
        }
        let checkuser = await model.CheckUser(u_id);
        if (checkuser.length > 0) {

            let Addresslist = await model.ListAddressQuery(u_id);

            if (Addresslist.length > 0) {
                return res.send({
                    result: true,
                    message: "Data retrived",
                    list: Addresslist,
                });
            } else {
                return res.send({
                    result: false,
                    message: "data not found",
                });
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
            message: error.message,
        });


    }
}