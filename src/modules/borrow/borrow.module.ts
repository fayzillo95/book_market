import { Logger, Module } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';

@Module({
  imports : [],
  controllers: [BorrowController],
  providers: [BorrowService,Logger],
})
export class BorrowModule {}
