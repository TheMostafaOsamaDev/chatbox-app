import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponseOptions } from '@nestjs/swagger';
import { swaggerResponsesDecorator } from 'src/swagger/swagger.global.decorators';
import { User } from './user.schema';

export const RegisterDecorator = () => {
  const responses: ApiResponseOptions[] = [
    {
      status: 201,
      description: 'User created successfully',
      type: User,
    },
    {
      status: 409,
      description: 'User already exists',
    },
  ];

  return applyDecorators(swaggerResponsesDecorator(responses));
};

export const LoginDecorator = () => {
  const responses: ApiResponseOptions[] = [
    {
      status: 200,
      description: 'User logged in successfully',
    },
    {
      status: 401,
      description: 'Unauthorized',
    },
  ];

  return applyDecorators(swaggerResponsesDecorator(responses));
};
