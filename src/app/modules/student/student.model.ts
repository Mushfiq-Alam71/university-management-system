import { Schema, model } from 'mongoose';
import type {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import { maxLength } from 'zod';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    validate: function (value: String) {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      return firstNameStr === value;
      // if (value !== firstNameStr) {
      //   return false;
      // }
      // return true;
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father contact number is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother contact number is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Local guardian name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Local guardian contact number is required'],
  },
  relation: {
    type: String,
    trim: true,
    required: [true, 'Relation with local guardian is required'],
  },
});

//
//
//
//
// student schema
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Student ID is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Email is required'],
    },
    contactNo: {
      type: String,
      trim: true,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      trim: true,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
      required: [true, 'Blood group is required'],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImage: {
      type: String,
      trim: true,
      required: [true, 'Profile image URL is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

// // post save middleware
// studentSchema.pre('save', async function (next: any) {
//   // console.log(this, 'pre hook : we will save  data');
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this; // doc
//   // hashing password and save into DB
//   user.password = await bcrypt.hash(user.password, Number(config.bcrypt));
//   next();
// });

// // post save middleware / hook
// studentSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

// virtual
studentSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.middleName + this.name.lastName;
});

// Query Middleware
studentSchema.pre('find', function (next: any) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next: any) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// [ {$match: { isDeleted : {  $ne: : true}}}   ,{ '$match': { id: '123456' } } ]

studentSchema.pre('aggregate', function (next: any) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// student model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
