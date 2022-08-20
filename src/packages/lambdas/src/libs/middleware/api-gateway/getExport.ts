import * as AWS from 'aws-sdk';

AWS.config.region = process.env.AWS_REGION;

/**
 * Map Swagger/Open API routes into express routes by pulling in the api spec document and
 * returning the equivalent API Gateway routes.
 *
 * @param {string} restApiId
 * @returns {<PromiseResult<AWS.APIGateway.ExportResponse, AWS.AWSError>>}
 */
const getExport = async (restApiId: string) => {
  const apiGateway = new AWS.APIGateway();

  const parameters = {
    exportType: 'oas30',
    restApiId,
    stageName: 'v1',
    accepts: 'application/json',
  };

  return apiGateway.getExport(parameters).promise();
};

export default getExport;
