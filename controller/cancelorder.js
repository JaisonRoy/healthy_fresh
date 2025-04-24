var model = require("../model/cancelorder");
// var Razorpay = require('razorpay')
const randtoken = require('rand-token');
var axios = require('axios')
var nodemailer = require("nodemailer");
var moment = require('moment')

module.exports.CancelOrder = async (req, res) => {
    try {
        let { user_id, order_id } = req.body;
        if (!user_id || !order_id) {
            return res.send({
                result: false,
                message: "insufficent parameter"
            })
        }
        let checkuser = await model.CheckUser(user_id);
        if (checkuser.length > 0) {
            let checkorder = await model.CheckOrder(order_id, user_id);
            if (checkorder.length > 0) {
                if (checkorder[0]?.od_status === 'delivered') {
                    return res.send({
                        result: false,
                        message: "This order cannot be cancelled,Product is already delivered "
                    })
                }

                if (checkorder[0]?.od_status === 'cancelled') {
                    return res.send({
                        result: false,
                        message: "This order already cancelled "
                    })
                }
                var order_date = checkorder[0]?.od_created_at
                console.log(checkorder)

                if (checkorder[0].od_payment_method !== 'cash on delivery') {

                    let removeorder = await model.RemoveOrder(order_id);

                    let orderproduct = await model.OrderProductDetails(order_id)

                    for (let el of orderproduct) {
                        let product_id = el.op_product_id
                        let quantity = el.op_quantity

                        let checkproduct = await model.getproduct(product_id);
                        // console.log(checkproduct);
                        let stockStr = checkproduct[0]?.p_stocks;

                        // Extract numeric value and unit from the stock string
                        let stockMatch = stockStr.match(/^([\d.]+)\s*(\D+)$/);

                        let stockNum = parseFloat(stockMatch[1]); //  15
                        let unit = stockMatch[2]; // kg/gm

                        // Subtract quantity
                        let balanceStock = stockNum + quantity;

                        // Add the unit back
                        let finalStock = balanceStock + unit;

                        let addstock = await model.AddStock(finalStock, product_id)
                    }

                    return res.send({
                        result: true,
                        message: "order cancelled successfully"
                    })

                    // var paymentId = checkorder[0].payment_id; // Replace PAYMENT_ID with the actual payment ID
                    // let key_id = "rzp_test_4JJAaipsPAqRRJ"
                    // let key_secret = "Gw6kdV3PCewFzn9kpvWU5zJH"
                    // var requestData = {
                    //     "amount": Number(checkorder[0].order_amount) * 100,
                    //     "speed": "optimum",
                    //     "receipt": "Receipt No." + " " + generateOrderId()
                    // }
                    // var authHeader = {
                    //     auth: {
                    //         username: key_id,
                    //         password: key_secret,
                    //     },
                    // };

                    // axios.post(`https://api.razorpay.com/v1/payments/${paymentId}/refund`, requestData, authHeader)
                    //     .then(async response => {
                    //         let removeorder = await model.RemoveOrder(order_id);

                    //         let orderproduct = await model.OrderProductDetails(order_id)

                    //         orderproduct.forEach = async (el) => {
                    //             let product_id = el.op_product_id
                    //             let quantity = el.op_quantity

                    //             let addstock = await model.AddStock(quantity, product_id)
                    //         }

                    //         console.log('Refund successful:', response?.data);
                    //         res.send({
                    //             result: true,
                    //             message: response?.data
                    //         })
                    //     })
                    //     .catch(error => {

                    //         console.error(error?.response?.data?.error?.description);
                    //         res.send({
                    //             result: false,
                    //             message: error.response ? error.response?.data?.error?.description : error?.message
                    //         })

                    //     });
                } else {
                    let removeorder = await model.RemoveOrder(order_id);

                    let orderproduct = await model.OrderProductDetails(order_id)
                    console.log(orderproduct, "ooooo");

                    for (let el of orderproduct) {
                        let product_id = el.op_product_id
                        let quantity = el.op_quantity
                        let checkproduct = await model.getproduct(product_id);
                        console.log(checkproduct, "cancel pro");
                        let stockStr = checkproduct[0]?.p_stocks;

                        // Extract numeric value and unit from the stock string
                        let stockMatch = stockStr.match(/^([\d.]+)\s*(\D+)$/);

                        let stockNum = parseFloat(stockMatch[1]); //  15
                        let unit = stockMatch[2]; // kg/gm

                        // Subtract quantity
                        let balanceStock = stockNum + quantity;

                        // Add the unit back
                        let finalStock = balanceStock + unit;
                        console.log(finalStock, "stock");

                        let addstock = await model.AddStock(finalStock, product_id)

                    }

                    let transporter = nodemailer.createTransport({
                        host: "smtp.hostinger.com",
                        port: 587,
                        auth: {
                            type: 'custom',
                            method: 'PLAIN',
                            user: 'noreply@bhakshanangal.com',
                            pass: 'noreplay@BH123',
                        },
                    });

                    let data = [{
                        email: ` ${checkorder[0]?.user_email}`,
                        subject: "HEALTHY FRESH CANCEL ORDER CONFIRMED",
                        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Cancellation Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        p {
            color: #555;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #555;
        }
        .success-message {
            font-size: 1.2em;
            color: green;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Order Cancellation Successful</h1>
        <p class="success-message">Dear ${checkuser[0]?.u_name}, your order has been successfully canceled.</p>
        
       <p>We are writing to confirm that your order cancellation request has been successfully processed.</p>
            <p>Your order has been cancelled, and any applicable refunds will be processed shortly. You will receive a separate notification once the refund has been completed.</p>
            <p>If you have any further questions or concerns, feel free to reach out to our support team. We're here to assist you.</p>
            <p>Thank you for your understanding and cooperation.</p>
            <p>Order Id :${order_id}</p>
        <div class="footer">
            <p>Thank you for being with us!</p>
            <p>HEALTHY FRESH</p>
        </div>
    </div>
</body>
</html>
`
                    },
                    {
                        email: 'jaisonlunar701@gmail.com',
                        subject: `HEALTHY FRESH CANCEL ORDER FROM : ${checkuser[0]?.u_name}`,
                        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Cancellation Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        h1 {
            color: #333;
        }
        .order-details {
            margin: 20px 0;
            font-size: 1.1em;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #555;
        }
        .important {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Order Cancellation Notification</h1>
        <p>Sir,</p>
        <p class="order-details">We wanted to inform you that the following order has been successfully canceled:</p>

        <table>
            <tr>
                <td><strong>User Name:</strong></td>
                <td>${checkuser[0]?.u_name}</td>
            </tr>
            <tr>
                <td><strong>Order ID:</strong></td>
                <td>${order_id}</td>
            </tr>
            <tr>
                <td><strong>Order Date:</strong></td>
                <td>${moment(order_date).format('YYYY-MMM-DD')}</td>
            </tr>
            
            <tr>
                <td><strong>Phone Number:</strong></td>
                <td>${checkorder[0]?.user_mobile_no}</td>
            </tr>
        </table>

        <p>If you need further assistance, please reach out to the customer directly for more information.</p>

        <div class="footer">
            <p>Thank you </p>
            <p>HEALTHY FRESH TEAM</p>
        </div>
    </div>
</body>
</html>
`
                    }]


                    data.forEach(async (el) => {
                        let infos = await transporter.sendMail({
                            from: "HEALTHY FRESH <noreply@bhakshanangal.com>",
                            to: el.email,
                            subject: el.subject,
                            html: el.html
                        });
                        nodemailer.getTestMessageUrl(infos);

                    });

                    res.send({
                        result: true,
                        message: "order cancelled successfully"
                    })
                }
                console.log("in here", checkorder[0].od_payment_method);

            } else {
                return res.send({
                    result: false,
                    message: "Order not found"
                })
            }
        } else {
            return res.send({
                result: false,
                message: "User not found"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
};

// const generateOrderId = () => {
//     return randtoken.generate(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
// };
