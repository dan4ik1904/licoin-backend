import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, ProductsService]
})
export class TransactionsModule {}
