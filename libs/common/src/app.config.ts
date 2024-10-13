import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  auth: {
    jwtSecret: process.env.JWT_SECRET,
  },
  microservices: {
    gateway: {
      port: parseInt(process.env.GATEWAY_PORT || '3000', 10),
      host: process.env.GATEWAY_HOST || 'localhost',
      clintHost: process.env.GATEWAY_HOST_CLIENT || 'localhost',
    },
    auth: {
      port: parseInt(process.env.AUTH_PORT || '3001', 10),
      host: process.env.AUTH_HOST || 'localhost',
      clintHost: process.env.AUTH_HOST_CLIENT || 'localhost',
    },
    tasks: {
      port: parseInt(process.env.TASKS_PORT || '3002', 10),
      host: process.env.TASKS_HOST || 'localhost',
      clintHost: process.env.TASKS_HOST_CLIENT || 'localhost',
    },
    habits: {
      port: parseInt(process.env.HABITS_PORT || '3003', 10),
      host: process.env.HABITS_HOST || 'localhost',
      clintHost: process.env.HABITS_HOST_CLIENT || 'localhost',
    },
    users: {
      port: parseInt(process.env.USERS_PORT || '3004', 10),
      host: process.env.USERS_HOST || 'localhost',
      clintHost: process.env.USERS_HOST_CLIENT || 'localhost',
    },
  },
  database: {
    uri:
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}` +
      `@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`,
  },
}));
