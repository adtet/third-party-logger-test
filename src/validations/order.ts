import { body, header } from "express-validator";

export const createValidation = () => [
  body("remark")
    .exists()
    .withMessage("remark required")
    .isString()
    .withMessage("remark is string")
    .notEmpty()
    .withMessage("remark not empty"),
  body("data").exists().withMessage("data required"),
];
