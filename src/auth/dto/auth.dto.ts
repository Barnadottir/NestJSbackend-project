import { IsEmail, IsNotEmpty, IsString } from "class-validator";
// validation pipes to check that the input types are correct
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}