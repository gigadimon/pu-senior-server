const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const axios = require('axios');
const webimRouter = require('./routes/api/webim');
const authRouter = require('./routes/senior/auth');
axios.defaults.headers['Cookie'] = process.env.WEBIM_COOKIE;
const cookieParser = require('cookie-parser');
const { UserError } = require('./errors/user');
const { WebimError } = require('./errors/webim');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors({ credentials: true, origin: process.env.WHITELIST.split(';') }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api/webim', webimRouter);
app.use('/senior/auth', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  if (err instanceof UserError || err instanceof WebimError) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: err.message });
});

module.exports = app;
