const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validatorBody = require("../../middlewares");
const addSchema = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validatorBody(addSchema), ctrl.addContact);

router.put("/:contactId", validatorBody(addSchema), ctrl.updateContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
