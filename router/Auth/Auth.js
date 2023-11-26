const { Router } = require('express');
const router = Router();

// import controller
const authController = require('../../controller/Auth/authRoute');

router.post("/login", authController.Login);
router.post("/sign-up", authController.signUp);
router.post("/generate-otp", authController.generateOTP);

module.exports = router;