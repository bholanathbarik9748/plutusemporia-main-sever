const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// import Helper Function
const { createToken } = require('../../helper/CookieToken');
const { handlerError } = require('../../helper/ErrorHandler');
const { generateOTP } = require('../../helper/GenerateToken');

// import models
const UserModel = require('../../model/Auth');

const maxAge = 3 * 24 * 60 * 60;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASS_KEY,
    },
});

module.exports.Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await UserModel.findOne({ email });

        // Verify user via email id
        if (!userData) {
            return res.status(404).json({
                success: false,
                error: "Invalid email"
            });
        }

        // Compare Password
        const authUser = await bcrypt.compare(password, userData.password);

        if (!authUser) {
            return res.status(401).json({
                success: false,
                error: "Invalid password"
            });
        }

        // Generate and set authentication token
        const authToken = createToken(userData._id);
        res.cookie('authToken', authToken, { httpOnly: true, maxAge: maxAge * 1000 });

        return res.status(200).json({
            success: true,
            authToken: { token: authToken },
            data: { userData: userData }
        });

    } catch (error) {
        // Log unexpected errors for debugging
        console.error('Login error:', error);

        // Handle known errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation error',
            });
        }

        // Handle other errors
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};

module.exports.signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await UserModel.create({
            email,
            password
        });
        const authToken = createToken(userData._id);
        res.cookie('authToken', authToken, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({
            success: true,
            data: { user: userData },
            authToken: { token: authToken }
        });
    } catch (err) {
        console.log(err);
        const errorHandler = handlerError(err);
        res.status(400).json({
            success: false,
            errorHandler
        });
    }
}

module.exports.generateOTP = (req, res) => {
    const { email } = req.body;

    const otp = generateOTP();
    const mailOptions = {
        from: 'bbarik00000@gmail.com',
        to: email,
        subject: 'Your Plutus Emporia OTP Code',
        text: `Your OTP code is: ${otp}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send OTP via email.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({
                success: true,
                sendOTP: otp,
            });
        }
    });
}