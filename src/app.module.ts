import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule, 
    BookmarkModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  PrismaModule],
})
export class AppModule {}
