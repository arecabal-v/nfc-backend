import 'dotenv/config';
const env = (key: string) => {
  return process.env[key];
};

export default {
  PORT: parseInt(env('PORT') || '3000'),
  ENVIRONMENT: env('ENVIRONMENT') ?? 'DEVELOP',
  LOGGER_LEVELS: {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
  },
  MONGO: {
    CONNECTIONS: [
      {
        URL: env('MONGO_URL') || '',
        DATABASE: env('MONGO_DATABASE') || 'nfc-backend',
      },
    ],
  },
  JWT: {
    SECRET: env('JWT_SECRET') || 'default-secret-key-change-in-production',
  },
};
