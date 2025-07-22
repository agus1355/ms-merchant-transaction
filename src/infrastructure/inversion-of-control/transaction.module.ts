import { Module } from '@nestjs/common';
import { ITransactionRepository } from 'src/application/ports/ITransactionRepository';
import { TransactionUseCases } from 'src/application/use-cases/TransactionUseCases';
import { TransactionController } from 'src/presentation/controllers/transaction.controller';
import { TransactionRepository } from '../database/repositories/TransactionRepository';
import { TransactionService } from 'src/domain/services/transaction.service';
import { ReceivableService } from 'src/domain/services/receivable.service';
import { TOKENS } from 'src/application/tokens';
import { ReceivableRepository } from '../database/repositories/ReceivableRepository';
import { PaymentService } from 'src/domain/services/payment.service';
import { PaymentRepository } from '../database/repositories/PaymentRepository';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    { provide: TOKENS.TransactionRepository, useClass: TransactionRepository },
    ReceivableService,
    { provide: TOKENS.ReceivableRepository, useClass: ReceivableRepository },
    PaymentService,
    { provide: TOKENS.PaymentRepository, useClass: PaymentRepository },
    TransactionUseCases,
  ],
})
export class TransactionModule {}
