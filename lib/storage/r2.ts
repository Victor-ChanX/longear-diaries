import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

let cachedClient: S3Client | null = null;

const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (!value || value.length === 0) {
    throw new Error(
      `Missing R2 env variable: ${name}. Set it in .env.local. See .env.example.`,
    );
  }

  return value;
};

const getConfig = () => ({
  accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
  accountId: requireEnv("R2_ACCOUNT_ID"),
  bucket: requireEnv("R2_BUCKET"),
  publicUrl: requireEnv("R2_PUBLIC_URL").replace(/\/$/, ""),
  secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
});

const getClient = (): S3Client => {
  if (cachedClient) return cachedClient;

  const cfg = getConfig();

  cachedClient = new S3Client({
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
    endpoint: `https://${cfg.accountId}.r2.cloudflarestorage.com`,
    region: "auto",
  });

  return cachedClient;
};

export async function putObject(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<void> {
  const client = getClient();
  const { bucket } = getConfig();

  await client.send(
    new PutObjectCommand({
      Body: body,
      Bucket: bucket,
      ContentType: contentType,
      Key: key,
    }),
  );
}

export async function deleteObject(key: string): Promise<void> {
  const client = getClient();
  const { bucket } = getConfig();

  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );
}

export function getPublicUrl(key: string): string {
  const { publicUrl } = getConfig();

  return `${publicUrl}/${key}`;
}
