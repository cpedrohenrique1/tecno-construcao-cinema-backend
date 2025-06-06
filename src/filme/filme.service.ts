import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilmeService {
  constructor(private prismaService: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto) {
    const filmeAlreadyExists = await this.prismaService.filme.findUnique({
      where: {
        titulo: createFilmeDto.titulo,
      },
    });
    if (filmeAlreadyExists) {
      throw new ConflictException('Filme já cadastrado');
    }
    return await this.prismaService.filme.create({
      data: createFilmeDto
    });
  }

  async findAll() {
    return await this.prismaService.filme.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} filme`;
  }

  update(id: number, updateFilmeDto: UpdateFilmeDto) {
    return `This action updates a #${id} filme`;
  }

  remove(id: number) {
    return `This action removes a #${id} filme`;
  }
}
