import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

export const swaggerResponsesDecorator = (responses: ApiResponseOptions[]) => {
  const otherResponses = responses.map((response) => ApiResponse(response));

  return applyDecorators(
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
    }),
    ...otherResponses,
  );
};
