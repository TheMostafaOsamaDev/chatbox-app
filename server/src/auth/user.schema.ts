import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  // Password verification method
  static async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Generate a username from the email
  static generateUsername(email: string): string {
    const randomString = Math.random().toString(36).substring(2, 7);

    return email.split('@')[0] + randomString;
  }
}

export const userSchema = SchemaFactory.createForClass(User);

// Pre-save hook to hash the password before saving
userSchema.pre<UserDocument>('save', async function (next) {
  // Check if the password is modified
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Attach the static method to the schema
userSchema.statics.verifyPassword = User.verifyPassword;
