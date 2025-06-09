import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmeModule } from './filme/filme.module';
import { PrismaService } from './prisma/prisma.service';
import { SalasModule } from './salas/salas.module';
import { SessoesModule } from './sessoes/sessoes.module';

@Module({
  imports: [FilmeModule, SalasModule, SessoesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
