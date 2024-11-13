import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ProductsController } from './products/products.controller';
import { TransactionsModule } from './transactions/transactions.module';
import { ProductsModule } from './products/products.module';
import { UploadsModule } from './upload/uploads.module';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, TransactionsModule, UploadsModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ]
})
export class AppModule {}
