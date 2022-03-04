# EKS Testing

Just a tiny CDK project to reproduce an issue with eksctl. To reproduce:

```shell
# Create the EKS cluster using the CDK (not eksctl). You need to pass EKSCTL_ROLE_ARN
# because eksctl uses your current role to talk to the control plane, but the CDK by
# default creates a role that you first need to assume to communicate with the control plane
EKSCTL_ROLE_ARN= "..arn for role you use to invoke eksctl..." cdk deploy

# Generate the cluster config for eskctl
./bin/generate-cluster-config > cluster.yml

# Create the managed node group
eksctl create nodegroup -f cluster.yml
```