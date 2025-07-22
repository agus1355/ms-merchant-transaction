import { Module } from '@nestjs/common';
import { ReceivableRepository } from '../database/repositories/ReceivableRepository';
import { ReceivableController } from 'src/presentation/controllers/receivable.controller';
import { ReceivableUseCases } from 'src/application/use-cases/ReceivableUseCases';
import { TOKENS } from 'src/application/tokens';
import { ReceivableService } from 'src/domain/services/receivable.service';

@Module({
  imports: [],
  controllers: [ReceivableController],
  providers: [
    { provide: TOKENS.ReceivableRepository, useClass: ReceivableRepository },
    ReceivableService,
    ReceivableUseCases,
  ],
})
export class ReceivableModule {}