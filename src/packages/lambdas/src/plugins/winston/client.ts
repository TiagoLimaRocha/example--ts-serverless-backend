import { format, createLogger, transports } from 'winston';

const { combine, timestamp, label, prettyPrint, splat, printf } = format;

const CATEGORY = 'petstore.aws.lambda.handler';

const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `;

  if (metadata) {
    msg += JSON.stringify(metadata);
  }

  return msg;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: CATEGORY }),
    splat(),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    prettyPrint(),    // Use in development
    // customFormat   // Use in production
  ),
  transports: [new transports.Console()],
});

export default logger;
