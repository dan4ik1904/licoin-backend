import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';

@Injectable()
export class UploadsService {
  getFile(fileName: string) {
    const filePath = join(__dirname, '..', '..', 'uploads', fileName);
    
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    return createReadStream(filePath);
  }
}