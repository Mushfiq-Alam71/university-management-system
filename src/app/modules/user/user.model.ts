import { model, Schema } from 'mongoose';
import type { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true, // 💡 Added unique (usually ID should be unique)
    },
    password: {
      type: String,
      required: true,
      select: 0, // 💡 Optional: Hides password by default in queries
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ FIX 1: Removed 'next' parameter. Since we use 'async', we just return a Promise.
userSchema.pre('save', async function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // ✅ FIX 2: Check if password is modified.
  // Without this, every user update (like changing roles) would re-hash the password.
  if (!user.isModified('password')) {
    return;
  }

  // Hashing password
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt));
});

// ✅ FIX 3: Cleaned up post hook types
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
