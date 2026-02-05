import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres', // colocar o banco de dados que vai ser usado em prod
            url: process.env.DATABASE_URL, // link de acesso ao banco de dados
            logging: false, // não exibir os logs do BD no terminal do render
            dropSchema: false, // não deletar os dados na reinicialização
            ssl: {
                rejectUnauthorized: false, // necessidade de chaves de segurança
            },
            synchronize: true, // sincronizar o código com o BD
            autoLoadEntities: true // reconhecer automaticamente todas as entidades
        }
        
    }
}