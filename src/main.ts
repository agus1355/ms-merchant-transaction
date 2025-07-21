import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getRabbitMQConfig } from './infrastructure/rabbitmq/rabbitmq-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rabbitConfig = getRabbitMQConfig();
  
  console.log(rabbitConfig);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rabbitConfig.username}:${rabbitConfig.password}@${rabbitConfig.host}:${rabbitConfig.port}`],
      queue: rabbitConfig.queue,
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('🚀 App running with HTTP + RabbitMQ');
}
bootstrap();