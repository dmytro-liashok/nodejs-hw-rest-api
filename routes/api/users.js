const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const { validatorBody, authenticate, upload } = require("../../middlewares");

router.post("/register", validatorBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", validatorBody(schemas.userEmailSchema), ctrl.resendVerifyEmail);

router.post("/login", validatorBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/",
  authenticate,
  validatorBody(schemas.subscriptionSchema),
  ctrl.changeSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.changeAvatar
);

module.exports = router;
