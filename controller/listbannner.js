var model = require("../model/listbannner");


module.exports.ListBanner = async (req, res) => {
    try {

        let bannerlist = await model.ListBannerQuery();

        if (bannerlist.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: bannerlist,
            });
        } else {
            return res.send({
                result: false,
                message: "Banner not found",
            });
        }
    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });


    }
}