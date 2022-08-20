import { format, createLogger, transports } from 'winston';

const { combine, timestamp, label, prettyPrint, splat } = format;
const CATEGORY = 'petstore.aws.lambda.handler';

const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    splat(),
    prettyPrint()
  ),
  transports: [new transports.Console()],
});

export default logger;
