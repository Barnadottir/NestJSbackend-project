import { User } from '@prisma/client';
import { JwtGuard } from './../auth/guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    // prisma generates types for us
    getMe(@GetUser() user: User, @GetUser('email') email: string) {
        console.log({
            email
        })
        return user;
    }

}
