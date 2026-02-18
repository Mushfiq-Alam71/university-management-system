import config from '../../config';
import type { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import type { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('User already exist {custom static}');
  //   }

  // create a user object
  const userData: Partial<TUser> = {};

  // If password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // manually generated ID
  userData.id = '2030100001';

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id; // embedded id
    studentData.user = newUser._id; // reference to user model _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
