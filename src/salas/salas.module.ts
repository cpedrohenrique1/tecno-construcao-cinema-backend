import { Module } from '@nestjs/common';
import { SalasService } from './salas.service';
import { SalasController } from './salas.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SalasController],
  providers: [SalasService, PrismaService],
})
export class SalasModule {}
