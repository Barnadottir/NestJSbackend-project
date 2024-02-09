import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Bookmark } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { dot } from 'node:test/reporters';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    prisma: PrismaService
    constructor(
        prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
        ) {
        this.prisma = prisma
    }
    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);
        try {
            // save the user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            })
            // do no want to return the hashed password
            delete user.hash
            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }
    }
    
    async signin(dto: AuthDto) {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });
        // if user does not exist throw exception
        if (!user)
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        // compare password
        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );
        // if password incorrect throw expection
        if (!pwMatches)
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number, 
        email: string
        ): Promise<{ access_token: string }> {
            const payload = {
                sub: userId,
                email,
            }
            const secret = this.config.get('JWT_SECRET')
        
            const token: string = await this.jwt.signAsync(payload,{
                // Jwt token will be available
                // for 15 minutes
                expiresIn: '100m',
                secret: secret,
            })
            return {
                access_token: token,
            }
        }
}