import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import {
  Bucket,
  BlockPublicAccess,
  BucketEncryption,
  ObjectOwnership,
} from 'aws-cdk-lib/aws-s3';
import { Tags, RemovalPolicy } from 'aws-cdk-lib';

type EnvName = 'local' | 'stage' | 'prod';

interface StackProps extends cdk.StackProps {
  envName: EnvName;
}

export class HpOtoyabakDataStack extends cdk.Stack {
  public readonly bucket: Bucket;
  public readonly s3OnlyPolicy: iam.ManagedPolicy;
  public readonly user: iam.User;
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const base = 'hp-otoyabak';
    const suffix = 'ga0du58fv23gas9bueraga';
    const { envName } = props;

    const bucketName = `${base}-${envName}-${suffix}`;

    this.bucket = new Bucket(this, 'Bucket', {
      bucketName,
      objectOwnership: ObjectOwnership.OBJECT_WRITER, // ACL有効 & オブジェクトライター
      blockPublicAccess: new BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      }), // パブリックアクセスブロック すべてOFF
      versioned: false,                               // バージョニング無効
      encryption: BucketEncryption.S3_MANAGED,       // デフォルト暗号化無効

      // 運用上の削除挙動だけは環境で分岐（任意）
      removalPolicy: envName === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      autoDeleteObjects: envName === 'prod' ? false : true,
    });

    Tags.of(this.bucket).add('name', base);
    Tags.of(this.bucket).add('app', base);
    Tags.of(this.bucket).add('env', envName);

    this.s3OnlyPolicy = new iam.ManagedPolicy(this, 'S3OnlyPolicy', {
      managedPolicyName: `${base}-${envName}-s3only`,
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3:ListBucket', 's3:GetBucketLocation'],
          resources: [this.bucket.bucketArn],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3:*'],
          resources: [this.bucket.arnForObjects('*')],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3:ListAllMyBuckets'],
          resources: ['*'],
        }),
      ],
    });

    Tags.of(this.s3OnlyPolicy).add('name', base);
    Tags.of(this.s3OnlyPolicy).add('app', base);
    Tags.of(this.s3OnlyPolicy).add('env', envName);


    this.user = new iam.User(this, 'user', {
      userName: `${base}-${envName}-user`,
    });
    
    Tags.of(this.user).add('name', base);
    Tags.of(this.user).add('app', base);
    Tags.of(this.user).add('env', envName);

    this.s3OnlyPolicy.attachToUser(this.user);
  }
}