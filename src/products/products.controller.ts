import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateBookDto } from './dto/update-products.dto';
import { AuthorBookGuard } from 'src/guards/author-book.guard';
import { ApiTags, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('/api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Получение списка всех книг' })
  @ApiOkResponse({ description: 'Успешное получение списка книг' })
  @Get()
  getAll() {
    return this.productsService.getAll()
  }

  @ApiOperation({ summary: 'Получение книги по ID' })
  @ApiOkResponse({ description: 'Успешное получение книги' })
  @Get("/:id")
  getOne(@Param('id') id: string) {
    return this.productsService.getOne(id)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удаление книги по ID' })
  @ApiOkResponse({ description: 'Успешное удаление книги' })
  @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @UseGuards(AuthorBookGuard)
  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.productsService.deleteProduct(id)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание новой книги' })
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ description: 'Успешное создание книги' })
  @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Headers('Authorization') tgId: string) {
    const tgIdNumber = Number(tgId)
    return this.productsService.createProduct(createProductDto, tgIdNumber)
  }
}