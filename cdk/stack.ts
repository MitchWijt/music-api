import * as cdk from "aws-cdk-lib"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from "aws-cdk-lib/aws-apigateway"
import { join } from 'path'

class Stack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambdaFunction = new NodejsFunction(this, "music-api-gql", {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: "graphqlHandler",
            entry: join(__dirname, '../src/handler.ts'),
            bundling: {
                minify: true
            }
        })

        new apiGateway.LambdaRestApi(this, "music-api-gatway", {
            handler: lambdaFunction
        })
    }
}

const app = new cdk.App()

new Stack(app, "my-cdk-stack", {
    stackName: 'my-cdk-stack'
})

