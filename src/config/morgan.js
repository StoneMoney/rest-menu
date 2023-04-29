const morgan = require('morgan');
const config = require('./config');
const logger = require('./logger');

morgan.token('user', (req) => {
  return req.user && req.user.email ? req.user.email : 'unknown_user';
});
morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:user :method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:user :method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
