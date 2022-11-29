import * as express from 'express';
import * as YAML from 'yamljs';
import * as path from 'path';
import * as Lambdas from 'src/handlers';

import { expressHandler } from 'src/middleware/express/lambdaHandler';

import { Request, Response } from 'express';

import { connector, Controllers } from 'swagger-routes-express';

//  NOTE:  Use to pull the api spec from API Gateway
// import { getExport } from 'src/libs/middleware/api-gateway';

const PATH_TO_API_SPEC = './assets/api/api.yaml';

const makeApp = (): express.Express => {
  const app = express();

  app.use(express.json());

  //  NOTE:  Here we are using a spec yaml file directly, however we could switch out this call by
  //         a getExport call passing in the API ID from AWS API Gateway, thus exporting the api spec
  //         directly from the cloud provider
  const apiSpec = YAML.load(path.resolve(__dirname, PATH_TO_API_SPEC));

  const nestedHandlers = Object.values(apiSpec.paths)
    .map((path: any) =>
      Object.values(path).map((method: any) => ({
        [method.operationId]: async (request: Request, response: Response) => {
          // @ts-ignore
          expressHandler(Lambdas[method.operationId], request, response);
        },
      }))
    )
    .flat();

  const extractedHandlers: Controllers = nestedHandlers.reduce(
    (acc: object, handler: any) => {
      const [key, value] = Object.entries(handler).flat();

      // @ts-ignore
      acc[`${key}`] = value;

      return acc;
    },
    {}
  );

  const connect = connector(extractedHandlers, apiSpec, {
    onCreateRoute: (method, descriptor) => {
      const [path, ...handlers] = descriptor;

      console.log('created route ->', method.toUpperCase(), path, handlers);
    },
  });

  connect(app);

  return app;
};

export default makeApp;
