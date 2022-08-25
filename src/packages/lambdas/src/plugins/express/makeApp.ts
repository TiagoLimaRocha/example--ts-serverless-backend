import * as express from 'express';
import * as YAML from 'yamljs';
import * as path from 'path';

import { logger } from 'src/plugins/winston';
import { connector, Controllers } from 'swagger-routes-express';

import { getExport } from 'src/libs/middleware/api-gateway';

const makeApp = (handlers?: Controllers): express.Express => {
  const app = express();

  app.use(express.json());

  if (handlers) {
    //  NOTE:  Here we are using a spec yaml file directly, however we could switch out this call by
    //         a getExport call passing in the API ID from AWS API Gateway, thus exporting the api spec
    //         directly from the cloud provider
    const apiSpec = YAML.load(path.resolve(__dirname, './assets/api/api.yaml'));

    const connect = connector(handlers, apiSpec, {
      onCreateRoute: (method, descriptor) => {
        const [path, ...handlers] = descriptor;

        logger.info('created route', method, path, handlers);
      },
    });

    connect(app);
  }

  return app;
};

export default makeApp;
