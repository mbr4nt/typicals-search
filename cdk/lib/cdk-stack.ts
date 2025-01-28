import * as cdk from 'aws-cdk-lib';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as path from 'path';
import { DockerImageAsset } from 'aws-cdk-lib/aws-ecr-assets';

import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let branchName = "master"; //TODO: get from param
    let appName = 'gcs'; //global chair search
    let prefix = `${appName}-${branchName}`;

    const vpc = new ec2.Vpc(this, `${prefix}-vpc`, {
    });

    const cluster = new ecs.Cluster(this, `${prefix}-cluster`, {
        vpc: vpc
    });

    let stack = this;
    deployContainer('engine', appName, 7700, {});
    deployContainer('ui', appName, 80, {});

    function deployContainer(name: string, prefix: string, port: number, environment: {[key: string]:string}) : void {
      let fullName = `${prefix}-${name}`;
      const asset = new DockerImageAsset(stack, `${name}-image`, {
        directory: path.join(__dirname, `../../${name}`)
      });
    
      // Create a load-balanced Fargate service and make it public
      new ecs_patterns.ApplicationLoadBalancedFargateService(stack, `${fullName}-fs`, {
          cluster: cluster, // Required
          cpu: 256, 
          desiredCount: 1, 
          taskImageOptions: { 
            image: ecs.ContainerImage.fromDockerImageAsset(asset), 
            containerPort: port,
            environment: environment
          },
          memoryLimitMiB: 512, 
          publicLoadBalancer: true,
      });
    }
  }
}


