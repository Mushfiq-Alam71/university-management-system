import Joi from 'joi';

// 🔢 Schema for UserName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base': '{#value} is not in capitalized format',
    }),
  middleName: Joi.string().trim().max(20).allow(''),
  lastName: Joi.string().required().trim().max(20),
});

// 🔢 Schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNo: Joi.string().required().trim(),
  motherName: Joi.string().required().trim(),
  motherOccupation: Joi.string().required().trim(),
  motherContactNo: Joi.string().required().trim(),
});

// 🔢 Schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  occupation: Joi.string().required().trim(),
  contactNo: Joi.string().required().trim(),
  relation: Joi.string().required().trim(),
});

// 🚀 Main Student Validation Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string().allow(''),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string().uri().required(),
  isActive: Joi.string().valid('active', 'inactive').default('active'),
});

export default studentValidationSchema;
