import { Module} from '@nestjs/common';
import { AppController } from './presentation/controllers/app.controller';
import { AppService } from './domain/services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitService } from './domain/services/rabbit.service';
import { AppDataSource } from './infrastructure/database/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [AppController],
  providers: [AppService, RabbitService],
})
export class AppModule {}
