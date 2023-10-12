const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validatorBody, isValidId, authenticate } = require("../../middlewares");
const {
  addSchema,
  contactUpdateFavoriteSchema,
} = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validatorBody(addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validatorBody(addSchema),
  ctrl.updateContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validatorBody(contactUpdateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
