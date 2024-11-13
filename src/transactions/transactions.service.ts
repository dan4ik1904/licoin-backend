import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransactionDto } from './dto/transaction.dto';


@Injectable()
export class TransactionsService {

    constructor(private readonly prisma:PrismaService){}

    async fetchMyTransactions(tgId) {
        try {
            const users_session = await this.prisma.users_sessions.findFirst({
                where: {
                    tgId: tgId
                }
            })
            const transactions = await this.prisma.users_sessions.findMany({
                where: {
                    userId: users_session.userId
                }
            })
            return transactions
        } catch (error) {
            
        }
    }

    async transaction(tgId: number, data: TransactionDto) {
        try {
            const userSession = await this.prisma.users_sessions.findFirst({
                where: { tgId },
            });

            console.log(userSession)
        
            if (!userSession) {
                throw new HttpException({ message: 'User session not found' }, 404);
            }
        
            const userSender = await this.prisma.users.findFirst({
                where: { id: userSession.userId },
            });
        
            const userRecipient = await this.prisma.users.findFirst({
                where: { id: data.userRecipientId },
            });

            console.log(userSender, userRecipient)
        
            if (!userSender || !userRecipient) {
                throw new HttpException({ message: 'Sender or recipient not found' }, 404);
            }
        
            const transactionData = await this.prisma.$transaction(async (prisma) => {
                if(userSender.role !== 'teacher') {
                    if(userSender.balance < data.countMoney) {
                        throw new HttpException({ message: 'Sender blanace less count money' }, 403);
                    }

                    const updatedSender = await prisma.users.update({
                        where: { id: userSender.id },
                        data: { balance: userSender.balance - data.countMoney },
                    });
            
                    const updatedRecipient = await prisma.users.update({
                        where: { id: userRecipient.id },
                        data: { balance: userRecipient.balance + data.countMoney },
                    });
            
                    return await this.prisma.transactions.create({
                        data: {
                            userSenderId: updatedSender.id,
                            userRecipientId: updatedRecipient.id,
                            moneyCount: data.countMoney,
                        },
                    });
                }else {
                    const updatedRecipient = await prisma.users.update({
                        where: { id: userRecipient.id },
                        data: { balance: userRecipient.balance + data.countMoney },
                    });
            
                    return await this.prisma.transactions.create({
                        data: {
                            userSenderId: userSender.id,
                            userRecipientId: updatedRecipient.id,
                            moneyCount: data.countMoney,
                        },
                    });
                }
                
            });
        
            return transactionData;
        } catch (error) {
            throw new HttpException({ message: 'error' }, 500);
        }
        
    }



}
