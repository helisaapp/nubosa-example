import { Logger } from '@nestjs/common';

import { config } from 'dotenv';
import { z } from 'zod';

config(); // Load environment variables from .env file

export enum Environment {
  Development = 'development',
  Production = 'production',
  Qa = 'qa',
}

// Custom boolean transformer that properly handles "false" strings
const booleanTransformer = z.string().transform((val) => {
  // Convert string to lowercase for case-insensitive comparison
  const normalized = val.toLowerCase().trim();

  // Check for values that should be considered as false
  if (['false', '0', 'no', 'n', ''].includes(normalized)) {
    return false;
  }

  // Check for values that should be considered as true
  if (['true', '1', 'yes', 'y'].includes(normalized)) {
    return true;
  }

  // For any other string, return the boolean conversion
  return Boolean(val);
});

// Schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(Environment, {
    message: `NODE_ENV must be one of: ${Object.values(Environment).join(', ')}`,
  }),

  // Database
  NUBOSA_URL: z.string().min(1).default('localhost'),
  NUBOSA_ID_CLIENT: z.string().min(1).default('postgres'),
  NUBOSA_SECRET: z.string().min(1),
});

const { error, data } = envSchema.safeParse(process.env);

if (error) {
  Logger.error('Invalid environment variables:', error.issues);
  throw new Error(
    `Invalid environment variables: ${error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
  );
}

export const envs = {
  environment: data.NODE_ENV,
  nubosaUrl: data.NUBOSA_URL,
  nubosaIdClient: data.NUBOSA_ID_CLIENT,
  nubosaSecret: data.NUBOSA_SECRET,
};
