import status from 'http-status';
import type { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../Utils/sendResponse';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    // Zod Validation
    //  const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
