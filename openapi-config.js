const config = {
  schemaFile: './docs/openapi.yaml',
  apiFile: './src/shared/api/base-api.ts',
  apiImport: 'baseApi',
  outputFile: './src/shared/api/generated-api.ts',
  exportName: 'generatedApi',
  hooks: true,
}

module.exports = config
