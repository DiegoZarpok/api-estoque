const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Estoque',
      version: '1.0.0',
      description: 'CRUD de produtos usando Express, Mongoose e MongoDB Atlas'
    }
  },
  apis: ['./src/routes/*.js']
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/products', productRoutes);

console.log('String de conexão:', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB Atlas');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log(`Swagger disponível em http://localhost:${port}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  });
