import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserLoginDto {
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}