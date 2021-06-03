const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.combine(winston.format.json()),
        }),
        new winston.transports.Console({
            level: 'error',
            format: winston.format.combine(
                winston.format.json(),
                winston.format.prettyPrint(),
                winston.format.colorize()
            ),
        }),
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
    ],
});

exports.logger = logger;
