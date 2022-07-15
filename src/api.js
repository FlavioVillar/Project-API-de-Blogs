const express = require('express');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

app.use('/login', router.loginRoutes);
app.use('/user', router.userRoutes);
app.use('/categories', router.categoryRoutes);
app.use('/post', router.postRoutes);
app.use(errorHandler);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
