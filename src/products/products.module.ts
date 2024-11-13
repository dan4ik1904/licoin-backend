import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, UsersService],
  exports: [ProductsService]
})
export class ProductsModule {}
