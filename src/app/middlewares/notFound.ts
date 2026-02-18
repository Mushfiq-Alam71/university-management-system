import type { NextFunction, Request, Response } from 'express';
import { HttpStatus } from 'http-status';

const notFound = (req: Request, res: Response) => {
  return res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    error: '',
  });
};

export default notFound;
