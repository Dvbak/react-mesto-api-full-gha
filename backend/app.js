// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const routerRegistration = require('./routes/registr');
const routerLogin = require('./routes/login');
const auth = require('./middlewares/auth');

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use(requestLogger);
app.use(limiter);

app.use('/signup', routerRegistration);
app.use('/signin', routerLogin);

app.use(auth);
app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
