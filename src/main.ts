import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact("Jacqueline Cardeal","https://github.com/jackmarques","jacquelinecardeal@hotmail.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/swagger', app, document);


  process.env.TZ = '-03:00' // Configura o fuso horário da aplicação. Utilizando o comando process.env, definimos a variável de ambiente TZ (Time Zone) com o valor -03:00 (correspondente ao horário de Brasília no padrão UTC - Universal Time Coordinated). Sem essa configuração, o Nest exibirá atributos de data e hora com 3 horas de diferença, pois ele opera no fuso horário padrão UTC 00:00, enquanto o Brasil está em UTC -03:00 em relação a Greenwich. Por exemplo, um horário configurado como 12:00 seria exibido como 15:00.

  app.useGlobalPipes(new ValidationPipe()); // Ativa a classe ValidationPipe em todas as requisições HTTP. Com isso, utilizando as bibliotecas Class Validator e Class Transformer, é possível definir regras de validação para os atributos das classes entidade (models). Essas regras serão aplicadas em todas as requisições, especialmente nos métodos POST e PUT, verificando os atributos enviados no corpo da requisição para garantir que estejam de acordo com as validações definidas.

  app.enableCors(); // Habilita o Cross-Origin Resource Sharing (CORS) em toda a aplicação, permitindo que o servidor atenda requisições de diferentes origens.

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
