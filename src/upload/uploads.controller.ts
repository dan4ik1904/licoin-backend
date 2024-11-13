import {
    Controller,
    Post,
    Get,
    Param,
    Res,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UploadsService } from './uploads.service';
  
@Controller('/api/v1/uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
        message: 'File uploaded successfully',
        fileName: file.filename,
        };
    }

    @Get('image/:fileName')
    async getFile(@Param('fileName') fileName: string, @Res() res: Response) {
        const fileStream = this.uploadsService.getFile(fileName);
        fileStream.pipe(res);
    }
}