import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User email',
    required: true,
  })
  email: string;

  @IsString({ message: 'Invalid Name' })
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty({
    example: 'example',
    description: 'User name',
    required: true,
  })
  name: string;

  // @IsString({ message: 'Invalid Username' })
  // @ApiProperty({
  //   example: 'example',
  //   description: 'User username',
  // })
  // username: string;

  @IsString({ message: 'Invalid Password' })
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({
    example: 'example',
    description: 'User password',
    required: true,
  })
  password: string;
}
