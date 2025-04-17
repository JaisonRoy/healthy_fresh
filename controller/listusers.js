var model = require("../model/listusers");


module.exports.ListUsers = async (req, res) => {
    try {
        var { u_id } = req.headers;
        let condition = ''
        if (u_id) {
            condition = `where u_id = '${u_id}'`
        }
        let userlist = await model.ListUsers(condition);

        if (userlist.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: userlist,
            });
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