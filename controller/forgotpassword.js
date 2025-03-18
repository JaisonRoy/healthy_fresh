var model = require('../model/forgotpassword');
var nodemailer = require('nodemailer');
var moment = require('moment')
var bcrypt = require('bcrypt')
const crypto = require('crypto');

module.exports.ForgotPassword = async (req, res) => {
    try {

        var email = req.body.email;
        var u_role = req.body.u_role
        console.log(email);

        if (!email || !u_role) {
            return res.send({
                return: false,
                message: "insufficent parameters"
            })
        }
        let checkemail = await model.CheckEmailQuery(email, u_role)

        if (checkemail.length > 0) {
            let u_id = checkemail[0]?.u_id
            const token = crypto.randomBytes(20).toString('hex');

            const expirationDate = moment().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');

            let storetoken = await model.StoreResetToken(token, expirationDate, u_id);


            let transporter = nodemailer.createTransport({
                host: "smtp.hostinger.com",
                port: 587,
                auth: {
                    type: 'custom',
                    method: 'PLAIN',
                    user: 'support@choiceglobal.in',
                    pass: 'support123abcAB@',
                },
            });


            let infos = await transporter.sendMail({
                from: "HEALTHY FRESH <support@choiceglobal.in>",
                to: email,
                subject: "change passoword",
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change Password Email</title>
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
        p {
            color: #555;
        }
        .button {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Change Your Password</h1>
        <p>We received a request to change your password. If you did not request this, please ignore this email.</p>
        <p>To change your password, please click the button below:</p>
        <a href="http://localhost:6009/fishapp/change-password/${u_id}/${token}" class="button">Click here to change password</a>
        <p>This link will expire in 15 minutes</p>
        <p>Thank you!</p>
    </div>
</body>
</html>

`
            });
            nodemailer.getTestMessageUrl(infos);


            return res.send({
                result: true,
                message: "Password reset email sent "
            })

        } else {
            return res.send({
                result: false,
                message: "email not found"
            })
        }

    } catch (error) {
        console.log(error);

        return res.send({
            result: false,
            message: error.message
        })
    }
}



module.exports.ChangePassword = async (req, res) => {
    try {
        var u_id = req.params.u_id;
        console.log(u_id);
        const token = req.params.token;


        let tokenInfo = await model.ValidateResetToken(u_id, token);

        const tokenExpiry = moment(tokenInfo[0].u_token_expiry)

        const date = moment().isAfter(tokenExpiry);

        if (!tokenInfo || date == true) {
            return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invalid or Expired Link</title>
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
            text-align: center;
        }

        h1 {
            color: #d9534f; /* Bootstrap danger color */
        }

        p {
            color: #555;
        }

        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }

        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reset Link Invalid</h1>
        <p>The reset link you have used is invalid or has expired. Please request a new password reset link.</p>
    </div>
</body>
</html>
`)
        }

        var html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 0 20px; /* Add padding for smaller screens */
        }

        .container {
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px; /* Maximum width for larger screens */
            box-sizing: border-box; /* Include padding in width calculation */
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input[type="password"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box; /* Include padding in width calculation */
        }

        .submit-btn {
            display: inline-block;
            width: 340px;
            padding: 10px;
            text-align: center;
            background-color: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px; /* Space above button */
        }

        .submit-btn:hover {
            background-color: #0056b3;
        }

        .message {
            color: red;
            font-size: 0.9em;
            text-align: center; /* Center the error message */
        }

        @media (max-width: 480px) {
            h2 {
                font-size: 1.5em; /* Responsive heading size */
            }
            .submit-btn {
             width: 10px;
            }
            input[type="password"] {
                padding: 8px; /* Smaller padding for input fields */
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Change Password</h2>
        <form id="registrationForm" onsubmit="return false;">
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
                <span id="message" class="message"></span>
            </div>
            <a href="#" id="submitButton" class="submit-btn">Change Password</a>
        </form>
    </div>

    <script>
        // Ensure u_id is defined correctly (should be passed from server-side code)
        const u_id =${u_id}

        document.getElementById('submitButton').addEventListener('click', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');

    if (password !== confirmPassword) {
        event.preventDefault();
        message.textContent = "Passwords do not match.";
    }  else {
        message.textContent = ""; // Clear the message if they match
        // Concatenate strings to form the URL
        const url = 'http://localhost:6009/fishapp/reset-password/' + u_id + '/' + encodeURIComponent(password);

        // Redirect to the URL
        window.location.href = url; // Correctly redirect
    }
});

    </script >
</body >
</html >
`;

        return res.send(html);
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        });
    }
}



module.exports.ResetPassword = async (req, res) => {
    try {
        var u_id = req.params.u_id
        var password = req.params.password;
        console.log(u_id, password);

        var html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Changed Successfully</title>
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
            line-height: 1.5;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #555;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Changed Successfully</h1>
        <p>Dear User,</p>
        <p>Your password has been successfully changed. If you did not make this change, please contact our support team immediately.</p>
       
        <div class="footer">
            <p>Thank you for being a valued user!</p>
            <p>If you have any questions, feel free to reach out to us.</p>
        </div>
    </div>
</body>
</html>
`
        if (!u_id || !password) {
            return res.send({
                result: false,
                message: "insufficent parameter"
            })
        }
        var hashedpassword = await bcrypt.hash(password, 10)
        let ChangePassword = await model.UpdatePassword(hashedpassword, u_id);
        if (ChangePassword.affectedRows) {
            res.send(html)
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}