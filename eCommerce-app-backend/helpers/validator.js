import { body, check } from "express-validator";

export const validateRegistration = () => {
  return [
    body("email", "Invalid Email").notEmpty().isEmail(),
    body("password", "Password must be between 8 to 12 characters long")
      .notEmpty()
      .isLength({ min: 8, max: 12 }),
    body("firstName", "First name is required").notEmpty(),
    body("lastName", "Last name is required").notEmpty(),
    body("phoneNumber", "Phone number is required").notEmpty(),
    body("address", "Address is required").notEmpty(),
    body("secret", "Secret is required").notEmpty(),
    body("secret.question", "Secret question is required").notEmpty(),
    body("secret.answer", "Secret answer is required").notEmpty(),
  ];
};

export const validateForgotPassword = () => {
  return [
    body("email", "Invalid email").notEmpty().isEmail(),
    body("password", "Password must be between 8 to 12 characters long")
      .notEmpty()
      .isLength({ min: 8, max: 12 }),
    body("question", "Secret question is required").notEmpty(),
    body("answer", "Secret answer is required").notEmpty(),
  ];
};

export const validateCreateProduct = () => {
  // validate remaining fields
  return [
    check("name", "Product name is required").notEmpty(),
    check("description", "Product description is required").notEmpty()
  ];
};

export const validateCreateCategory = () => {
  return [
    body("name", "Category name is required").notEmpty(),
  ]
}
