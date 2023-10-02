const Joi = require("joi");

const addSchema = Joi.object()
  .when(Joi.object().min(1), {
    then: Joi.object({
      name: Joi.string().required().messages({
        "any.required": "missing required name field",
      }),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
          "any.required": "missing required email field",
        }),
      phone: Joi.string().required().messages({
        "any.required": "missing required phone field",
      }),
    }),
  })
  .min(1)
  .message({ "object.min": "missing fields" });

module.exports = addSchema;
