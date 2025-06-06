import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmeModule } from './filme/filme.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [FilmeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
