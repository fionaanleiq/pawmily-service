import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongooseConfig } from './config/mongoose.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from './shared/filters/all-exeption.filter';
import { configOptions } from './config/options.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { PostModule } from './posts/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(mongooseConfig),
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    UserModule,
    AuthModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    },
  ],
})
export class AppModule {}
