import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { UpdateUserDto } from './dto/update-user.dto';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findUser(username: string): Promise<User> {
    return this.userRepository.findOneBy({ firstName: username })
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async generatePdf(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(fs.createWriteStream(`${email}.pdf`));
      pdfDoc.text(`${user.firstName}+${user.lastName}`, 100, 100);
      pdfDoc.image(user.image);
      pdfDoc.end();
      this.userRepository.update(user.id, { pdf: Buffer.from(pdfDoc.toString()) });
      }
    }


  async saveImage(id: number, image: Express.Multer.File) {
    this.update(id, { image: image.buffer })
  }
}
