const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validatorBody = require("../../middlewares");
const schema = require("../../schemas/contacts-schema");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validatorBody(schema), ctrl.addContact);

router.put("/:contactId", validatorBody(schema), ctrl.updateContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
