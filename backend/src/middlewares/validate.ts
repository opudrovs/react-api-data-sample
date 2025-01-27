/**
 * Validation middleware
 */
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to validate request data based on express-validator rules.
 * If validation fails, it sends a 422 Unprocessable Entity response with error details.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Next middleware function.
 */
const validate = (req: Request, res: Response, next: NextFunction): void => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(422).json({ error: result.array() });
    return;
  }
  next(); // If no errors, proceed to the next middleware/controller.
};

export default validate;
