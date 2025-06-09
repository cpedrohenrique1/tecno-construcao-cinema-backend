import { Module } from '@nestjs/common';
import { SessoesService } from './sessoes.service';
import { SessoesController } from './sessoes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SessoesController],
  providers: [SessoesService, PrismaService],
})
export class SessoesModule {}
