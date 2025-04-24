var model = require("../model/deliverystatus");

module.exports.DeliveryStatus = async (req, res) => {
    try {
        var { delivery_status, order_id } = req.body;
        if (!delivery_status || !order_id) {
            return res.send({
                result: false,
                message: "insufficent parameter"
            })
        }
        let Deliverystatus = await model.DeliveryStatusQuery(delivery_status, order_id);

        if (Deliverystatus.affectedRows) {
            return res.send({
                result: true,
                message: "Delivery status changed",
            });
        } else {
            return res.send({
                result: false,
                message: "failed to change Delivery status",
            });
        }
    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });


    }
}

module.exports.PaymentStatus = async (req, res) => {
    try {
        var { payment_status, order_id } = req.body;
        if (!payment_status || !order_id) {
            return res.send({
                result: false,
                message: "insufficent parameter"
            })
        }
        let PaymentStatus = await model.PaymentStatusQuery(payment_status, order_id);

        if (PaymentStatus.affectedRows) {
            return res.send({
                result: true,
                message: "Payment status changed",
            });
        } else {
            return res.send({
                result: false,
                message: "failed to change Payment status",
            });
        }
    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });


    }
}