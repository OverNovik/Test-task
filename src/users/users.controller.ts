import { Body, Controller, Delete, Get, Param, Post, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { GeneratePdfDto } from './dto/generate-pdf.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('images'))
  uploadFile(@Body('id') id: number, @UploadedFile() images: Express.Multer.File) {
    this.usersService.saveImage(id, images);
  }

  @Post('generate-pdf')
  generateImagePdf(@Body() generatePdfDto: GeneratePdfDto) {
    return this.usersService.generatePdf(generatePdfDto.email);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
