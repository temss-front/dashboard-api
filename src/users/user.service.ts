import { IUserService } from './user.service.interface';
import { UsersRegisterDto } from './dto/users-register.dto';
import { UsersLoginDto } from './dto/users-login.dto';
import { User } from './user.entity';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
    async createUser({ email, name, password }: UsersRegisterDto): Promise<User | null> {
        const newUser = new User(email, name);
        await newUser.setPassword(password);

        //isExist?
        return null;
    }
    async validateUser(dto: UsersLoginDto): Promise<boolean> {
        return true;
    }
}
