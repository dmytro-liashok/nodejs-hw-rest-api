const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveError, runValidatorsAtUpdate } = require("./hooks");

const emailRegexp = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const contactShema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "missing required name field"],
    },
    email: {
      type: String,
      required: [true, "missing required email field"],
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: [true, "missing required phone field"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactShema.post("save", handleSaveError);
contactShema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactShema.post("findOneAndUpdate", handleSaveError);

const addSchema = Joi.object()
  .when(Joi.object().min(1), {
    then: Joi.object({
      name: Joi.string().required().messages({
        "any.required": "missing required name field",
      }),
      email: Joi.string().email().pattern(emailRegexp).required().messages({
        "any.required": "missing required email field",
      }),
      phone: Joi.string().required().messages({
        "any.required": "missing required phone field",
      }),
      favorite: Joi.boolean(),
    }),
  })
  .min(1)
  .message({ "object.min": "missing fields" });

const contactUpdateFavoriteSchema = Joi.object()
  .when(Joi.object().min(1), {
    then: Joi.object({
      favorite: Joi.boolean().required(),
    }),
  })
  .min(1)
  .message({ "object.min": "missing field favorite" });

const Contact = model("contacts", contactShema);

module.exports = {
  Contact,
  addSchema,
  contactUpdateFavoriteSchema,
};
