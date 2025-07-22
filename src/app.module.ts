import { Module} from '@nestjs/common';
import { AppController } from './presentation/controllers/app.controller';
import { AppService } from './domain/services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitService } from './domain/services/rabbit.service';
import { AppDataSource } from './infrastructure/database/data-source';
import { TransactionModule } from './infrastructure/inversion-of-control/transaction.module';
import { ReceivableModule } from './infrastructure/inversion-of-control/receivable.module';
import { TransactionEntity } from './infrastructure/database/mapper/transaction.entity';
import { ReceivableEntity } from './infrastructure/database/mapper/receivable.entity';
import { PaymentEntity } from './infrastructure/database/mapper/payment.entity';

@Module({
  imports: [
    TransactionModule,
    ReceivableModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([TransactionEntity,ReceivableEntity,PaymentEntity])
  ],
  controllers: [AppController],
  providers: [AppService, RabbitService],
})
export class AppModule {}
