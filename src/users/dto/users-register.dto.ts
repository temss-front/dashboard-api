import { IsEmail, IsString } from 'class-validator';

export class UsersRegisterDto {
    @IsEmail({}, { message: 'Неверный email' })
    email: string;

    @IsString({ message: 'Не указан пароль' })
    password: string;

    @IsString({ message: 'Не указано имя' })
    name: string;
}
