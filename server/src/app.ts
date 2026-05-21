import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { asyncHandler } from './shared/middleware/async-handler';
import { errorHandler } from './shared/middleware/error-handler';
import { formatResponse } from './shared/middleware/response-formatter';
import { openApiValidator } from './config/openapi-validator';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();

// Load OpenAPI spec
const swaggerDocument = YAML.load(path.join(__dirname, '../../docs/openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// OpenAPI validator
app.use(openApiValidator);

// Wrap responses
app.use(formatResponse);

app.use('/api', routes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Campus School ERP API",
    data: null,
  });
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    data: null,
  });
});

app.use(errorHandler);

export default app;