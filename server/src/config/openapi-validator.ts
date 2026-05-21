import * as OpenApiValidator from 'express-openapi-validator';
import path from 'path';

const specPath = path.resolve(__dirname, '../../../docs/openapi.yaml');

export const openApiValidator = OpenApiValidator.middleware({
  apiSpec: specPath,
  validateRequests: {
    removeAdditional: 'all',
  },
  validateResponses: false,
  ignorePaths: /^\/api\/?$/,
});