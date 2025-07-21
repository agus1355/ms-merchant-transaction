export const getRabbitMQConfig = () => ({
  host: process.env.RABBITMQ_HOST || 'localhost',
  port: parseInt(process.env.RABBITMQ_PORT ?? '5672', 10),
  username: process.env.RABBITMQ_USER || 'guest',
  password: process.env.RABBITMQ_PASSWORD || 'guest',
  queue: process.env.RABBITMQ_QUEUE || 'main_queue',
  vhost: process.env.RABBITMQ_VHOST || '/',
});
