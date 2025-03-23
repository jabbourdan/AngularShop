const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');
const app = express();
const cors = require('cors')
const apiRoutes = require('./api')

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}

const swaggerFile = fs.readFileSync('./api.yml', 'utf8');
const swaggerDocument = yaml.parse(swaggerFile);
app.use(express.json())

app.use(cors(corsOptions))
app.use('/api', apiRoutes, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log('Swagger UI available at http://localhost:3000/api');
});
