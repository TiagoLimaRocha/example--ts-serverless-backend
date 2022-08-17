provider "aws" {
  region = "eu-west-2"

  # Make it faster by skipping something
  skip_get_ec2_platforms      = true
  skip_metadata_api_check     = true
  skip_region_validation      = true
  skip_credentials_validation = true
  skip_requesting_account_id  = true
}

data "aws_caller_identity" "current" {}

###############################
# Lambda Layer (storing on S3)
###############################

module "lambda_layer_s3" {
  source = "../../"

  create_layer = true

  layer_name          = "${random_pet.this.id}-layer-s3"
  description         = "Lambda layer (deployed from S3)"
  compatible_runtimes = ["nodejs16.x"]

  source_path = "../../../../lambdas/src/handlers"

  store_on_s3 = true
  s3_bucket   = module.s3_bucket.s3_bucket_id
}

####################################################
# Lambda Function (building locally, storing on S3,
# set allowed triggers, set policies)
####################################################

module "lambda_function" {
  source = "../../modules/lambda"

  function_name          = "${random_pet.this.id}-[lambda_handler_name]"
  description            = "Lambda function description"
  handler                = "index.lambda_handler_name"
  runtime                = "nodejs16.x"
  ephemeral_storage_size = 10240
  architectures          = ["x86_64"]
  publish                = true

  source_path = "../../../../lambdas/src/handlers"

  store_on_s3 = true
  s3_bucket   = module.s3_bucket.s3_bucket_id
  s3_prefix   = "lambda-builds/"

  artifacts_dir = "${path.root}/.terraform/lambda-builds/"

  layers = [
    module.lambda_layer_s3.lambda_layer_arn,
  ]

  environment_variables = {
    Hello      = "World"
    Serverless = "Terraform"
  }

  role_path   = "/tf-managed/"
  policy_path = "/tf-managed/"

  attach_dead_letter_policy = true
  dead_letter_target_arn    = aws_sqs_queue.dlq.arn

  allowed_triggers = {
    APIGatewayAny = {
      service    = "apigateway"
      source_arn = "arn:aws:execute-api:eu-west-1:${data.aws_caller_identity.current.account_id}:aqnku8akd0/*/*/*"
    },
    APIGatewayDevPost = {
      service    = "apigateway"
      source_arn = "arn:aws:execute-api:eu-west-1:${data.aws_caller_identity.current.account_id}:aqnku8akd0/dev/POST/*"
    },
    OneRule = {
      principal  = "events.amazonaws.com"
      source_arn = "arn:aws:events:eu-west-1:${data.aws_caller_identity.current.account_id}:rule/RunDaily"
    }
  }

  ######################
  # Lambda Function URL
  ######################
  create_lambda_function_url = true
  authorization_type         = "AWS_IAM"
  cors = {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }

  ######################
  # Additional policies
  ######################

  assume_role_policy_statements = {
    account_root = {
      effect  = "Allow",
      actions = ["sts:AssumeRole"],
      principals = {
        account_principal = {
          type        = "AWS",
          identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
        }
      }
      condition = {
        stringequals_condition = {
          test     = "StringEquals"
          variable = "sts:ExternalId"
          values   = ["12345"]
        }
      }
    }
  }

  attach_policy_json = true
  policy_json        = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "xray:GetSamplingStatisticSummaries"
            ],
            "Resource": ["*"]
        }
    ]
}
EOF

  attach_policy_jsons = true
  policy_jsons = [<<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "xray:*"
            ],
            "Resource": ["*"]
        }
    ]
}
EOF
  ]
  number_of_policy_jsons = 1

  attach_policy = true
  policy        = "arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess"

  attach_policies    = true
  policies           = ["arn:aws:iam::aws:policy/AWSXrayReadOnlyAccess"]
  number_of_policies = 1

  attach_policy_statements = true
  policy_statements = {
    dynamodb = {
      effect    = "Allow",
      actions   = ["dynamodb:BatchWriteItem"],
      resources = ["arn:aws:dynamodb:eu-west-1:052212379155:table/Test"]
    },
    s3_read = {
      effect    = "Deny",
      actions   = ["s3:HeadObject", "s3:GetObject"],
      resources = ["arn:aws:s3:::my-bucket/*"]
    }
  }

  ###########################
  # END: Additional policies
  ###########################

  tags = {
    Module = "lambda1"
  }
}

##################
# Extra resources
##################

resource "random_pet" "this" {
  length = 2
}

module "s3_bucket" {
  source = "../../modules/s3-bucket"

  bucket        = "${random_pet.this.id}-bucket"
  force_destroy = true
}

resource "aws_sqs_queue" "dlq" {
  name = random_pet.this.id
}
