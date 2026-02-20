import type { NextFunction, Request, RequestHandler, Response } from 'express';

// tried "DRY" (Do not Repeat Yourself method to avoid repetitive code)
// It's a Higher Order Function
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
