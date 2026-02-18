import * as z from 'zod';

/* =======================
   Sub Schemas
======================= */

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must start with a capital letter',
      }
    ),

  middleName: z.string().trim().optional(),

  lastName: z.string().trim().min(1, 'Last name is required'),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father name is required'),
  fatherOccupation: z.string().trim().min(1, 'Father occupation is required'),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, 'Father contact number is required'),

  motherName: z.string().trim().min(1, 'Mother name is required'),
  motherOccupation: z.string().trim().min(1, 'Mother occupation is required'),
  motherContactNo: z
    .string()
    .trim()
    .min(1, 'Mother contact number is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, 'Local guardian name is required'),
  occupation: z.string().trim().min(1, 'Local guardian occupation is required'),
  contactNo: z
    .string()
    .trim()
    .min(1, 'Local guardian contact number is required'),
  relation: z.string().trim().min(1, 'Relation is required'),
});

/* =======================
   Student Schema
======================= */

const genderEnum = ['male', 'female', 'other'] as const;
const bloodGroupEnum = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;
const statusEnum = ['active', 'inactive'] as const;

export const studentValidationSchema = z.object({
  id: z.string().trim().min(1),

  name: userNameValidationSchema,
  password: z.string().max(20),

  gender: z.enum(genderEnum),

  dateOfBirth: z.string().optional(),

  email: z.string().email(),

  contactNo: z.string(),

  emergencyContactNo: z.string(),

  bloodGroup: z.enum(bloodGroupEnum),

  presentAddress: z.string(),

  permanentAddress: z.string(),

  guardian: guardianValidationSchema,

  localGuardian: localGuardianValidationSchema,

  profileImage: z.string().url(),

  isActive: z.enum(statusEnum).optional(),

  isDeleted: z.boolean().optional().default(false),
});

// export default {
//   studentValidationSchema,
// };
