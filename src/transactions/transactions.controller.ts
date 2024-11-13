import { Body, Controller, Get, Headers, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './dto/transaction.dto';
import { PrismaService } from 'src/prisma.service';


@ApiTags('Transactions')
@Controller('/api/v1/transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService,
                private readonly prisma: PrismaService
                ) {}

    @Post()
    async transaction(@Body() transactionDto: TransactionDto, @Headers('Authorization') tgId: string) {
        const tgIdNumber = Number(tgId)
        return this.transactionsService.transaction(tgIdNumber, transactionDto)
    }
    
    @UseGuards(AuthGuard)
    @Get('my')
    async getMyTransactions(@Headers('Authorization') tgId: string) {
        const tgIdNumber = Number(tgId)
        return this.transactionsService.fetchMyTransactions(tgIdNumber)
    }






    

}
