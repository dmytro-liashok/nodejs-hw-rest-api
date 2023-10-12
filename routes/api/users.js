const express = require("express");
const router = express.Router();

const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

const { validatorBody, authenticate } = require("../../middlewares");

router.post("/register", validatorBody(schemas.registerSchema), ctrl.register);

router.post("/login", validatorBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/",
  authenticate, 
  validatorBody(schemas.subscriptionSchema),
  ctrl.changeSubscription
);

module.exports = router;
