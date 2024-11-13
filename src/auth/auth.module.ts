import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, ProductsService]
})
export class AuthModule {}
