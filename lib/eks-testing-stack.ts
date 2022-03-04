import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cluster, KubernetesVersion } from 'aws-cdk-lib/aws-eks';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Role } from 'aws-cdk-lib/aws-iam';

export interface EksTestingStackProps extends StackProps {
  eksctlRoleArn?: string
}

export class EksTestingStack extends Stack {
  constructor(scope: Construct, id: string, props: EksTestingStackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'Vpc', {})

    const securityGroup = new SecurityGroup(this, 'ClusterSecurityGroup', {
      vpc: vpc
    })

    const cluster = new Cluster(this, 'Cluster',{
      version: KubernetesVersion.V1_21,
      vpc: vpc,
      securityGroup: securityGroup,
    })

    if (props.eksctlRoleArn) {
      cluster.awsAuth.addMastersRole(Role.fromRoleArn(this, 'EksctlRole', props.eksctlRoleArn))
    }

    new CfnOutput(this, 'ControlPlaneSG', {
      value: securityGroup.securityGroupId
    })

    new CfnOutput(this, 'ClusterName', {
      value: cluster.clusterName
    })
  }
}
