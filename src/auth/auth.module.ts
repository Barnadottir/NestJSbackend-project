import { JwtStrategy } from './strategy';
import { PrismaModule } from './../prisma/prisma.module';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}