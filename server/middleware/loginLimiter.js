const rateLimit = require("express-rate-limit")
const {logEvents} = require('./logger')

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // limits each IP to 5 login requests per window per minute
    message: {
        message: 'Too many login attempts, please try again after a 1 minute',
    },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests:
         ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'error.log')
         res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // return rate limit infor in the rate limit headers
    legacyHeaders: false, // Disable the x-rate-limit headers

})


module.exports = loginLimiter