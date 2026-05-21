"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = require("./shared/middleware/error-handler");
const response_formatter_1 = require("./shared/middleware/response-formatter");
const openapi_validator_1 = require("./config/openapi-validator");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Load OpenAPI spec
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '../../docs/openapi.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// OpenAPI validator
app.use(openapi_validator_1.openApiValidator);
// Wrap responses
app.use(response_formatter_1.formatResponse);
app.use('/api', routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Campus School ERP API",
        data: null,
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`,
        data: null,
    });
});
app.use(error_handler_1.errorHandler);
exports.default = app;
