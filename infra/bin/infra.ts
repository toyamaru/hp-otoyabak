// bin/app.ts
import * as cdk from 'aws-cdk-lib';
import { HpOtoyabakDataStack } from '../lib/hp-otoyabak-data-stack';

const app = new cdk.App();
const envName = (app.node.tryGetContext('env') ?? 'local').toString(); // local|stage|prod

if (!['local', 'stage', 'prod'].includes(envName)) {
  throw new Error("context 'env' must be one of: local | stage | prod");
}

new HpOtoyabakDataStack(app, `HpOtoyabakDataStack-${envName}`, {
  envName,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});