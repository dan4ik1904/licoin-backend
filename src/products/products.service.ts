import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateBookDto } from './dto/update-products.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService){}

    async getAll() {
        try {
            const products = await this.prisma.products.findMany()
            return products
        } catch (error) {
            throw new HttpException({error}, 500)
        }
        
    }

    async getOne(id: string) {
        try {
            const product = await this.prisma.products.findUnique({
                where: {id}
            })
            return product
        } catch (error) {
            throw new HttpException({message: 'No book'}, 400)
        }
        
    }

    async getMyProducts(tgId: number) {
        try {
            const session = await this.prisma.users_sessions.findFirst({
                where: {
                    tgId
                }
            })
            const products = await this.prisma.products.findMany({
                where: {userId: session.userId}
            })
            return products
        } catch (error) {
            throw new HttpException({error}, 500)
        }
        
    }

    // async updateOne(id: string, updateBookDto: UpdateBookDto, tgId: number) {
    //     try {
    //         const book = await this.prisma.products.findFirst({ where: { id } });
    //         if (!book) {
    //         // Обработка случая, если книга не найдена (например, вернуть ошибку)
    //         return null; // Или вернуть какое-то значение, обозначающее неудачу
    //         }
        
    //         const updatedBook = await this.prisma.products.update({
    //         where: { id },
    //         data: updateBookDto, // Обновляем книгу с данными из updateBookDto
    //         });
        
    //         // Получаем информацию о пользователе, связанном с сессией
    //         const session = await this.prisma.users_sessions.findFirst({
    //         where: { tgId },
    //         });
        
    //         if (!session) {
    //         // Обработка случая, если сессия не найдена (например, вернуть ошибку)
    //         return null; // Или вернуть какое-то значение, обозначающее неудачу
    //         }
        
    //         // Получаем информацию о пользователе, связанном с сессией
    //         const user = await this.prisma.users.findFirst({
    //         where: { id: session.userId },
    //         });
        
    //         if (!user) {
    //         // Обработка случая, если пользователь не найден (например, вернуть ошибку)
    //         return null; // Или вернуть какое-то значение, обозначающее неудачу
    //         }
        
    //         // Обновляем количество страниц, прочитанных пользователем
    //         await this.prisma.users.update({
    //         where: { id: user.id },
    //         data: {
    //             pagesCount:
    //             user.pagesCount -
    //             (book.pageCount || 0) +
    //             (updateBookDto?.pageCount || 0), // Обновление количества страниц
    //         },
    //         });
    //         return updatedBook; // Возвращаем обновленную книгу
    //     } catch (error) {
    //         throw new HttpException({error}, 500)

    //     }
      
    //   }

    async createProduct(createBookDto: CreateProductDto, tgId: number) {
        try {
            const user_session = await this.prisma.users_sessions.findFirst({
                where: {
                    tgId
                }
            })
            const book = await this.prisma.products.create({
                data: {
                    ...createBookDto,
                    userId: user_session.userId
                }
            })
           
            return book
        } catch (error) {
            throw new HttpException({message: error}, 500)
        }
        
    }

    async deleteProduct(id: string) {
        try {
            const book = await this.prisma.products.delete({
                where: { id }
            })
            return this.prisma.products.findFirst({where:{id}})
        } catch (error) {
            throw new HttpException({message: 'No user'}, 400)
        }
        
    }
}
