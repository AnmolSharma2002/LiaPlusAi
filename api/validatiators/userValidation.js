const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  role: Joi.string().valid("user", "admin").optional().messages({
    "any.only": 'Role must be either "user" or "admin"',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => ({
      msg: err.message,
      path: err.path[0],
    }));
    return res.status(400).json({ errors });
  }
  next();
};

module.exports.signup = validate(signupSchema);
module.exports.login = validate(loginSchema);
