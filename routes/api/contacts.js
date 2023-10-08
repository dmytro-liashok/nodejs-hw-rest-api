const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validatorBody, isValidId } = require("../../middlewares");
const {
  addSchema,
  contactUpdateFavoriteSchema,
} = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validatorBody(addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  isValidId,
  validatorBody(addSchema),
  ctrl.updateContact
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validatorBody(contactUpdateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
