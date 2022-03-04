#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EksTestingStack } from '../lib/eks-testing-stack';

const app = new cdk.App();
new EksTestingStack(app, 'EksTestingStack', {
  eksctlRoleArn: process.env.EKSCTL_ROLE_ARN
});