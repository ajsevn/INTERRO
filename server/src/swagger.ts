// src/swagger.ts
import swaggerAutogen from 'swagger-autogen';
import path from 'path';

const doc = {
  info: {
    title: 'Interro API Docs',
    description: 'Auto-generated Swagger docs for Interro API',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = path.join(__dirname, '../swagger_output.json');

const endpointsFiles = [
  './src/index.ts',                // main entry (for middlewares or root routes)
  './src/routes/authRoutes.ts',
  './src/routes/adminRoutes.ts',
  './src/routes/interviewRoutes.ts',
  './src/routes/questionRoutes.ts'
];

swaggerAutogen()(outputFile, endpointsFiles, doc);
