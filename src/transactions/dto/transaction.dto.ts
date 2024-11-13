import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransactionDto {
    @IsNotEmpty()
    @IsString()
    userRecipientId: string

    @IsNotEmpty()
    @IsNumber()
    countMoney: number
}