import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { SharedModule } from './shared/shared.module';
import { LoanModule } from './loan/loan.module';
import { DepositModule } from './deposit/deposit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientModule,
    SharedModule,
    LoanModule,
    DepositModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
