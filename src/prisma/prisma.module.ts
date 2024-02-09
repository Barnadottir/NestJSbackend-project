import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// this prisma service will be
// available to all modules in our app
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
