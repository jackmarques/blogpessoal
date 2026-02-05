import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.modules';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';
import { DevService } from './data/services/dev.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService, // para rodar o código na máquina tem que trocar para DevService
      imports: [ConfigModule],
    }),
    PostagemModule,
    TemaModule,
    AuthModule, 
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
