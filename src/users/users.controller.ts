import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUsersController } from './users.controller.interface';
import { UsersLoginDto } from './dto/users-login.dto';
import { UsersRegisterDto } from './dto/users-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { UserService } from './user.service';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
    constructor(
        @inject(TYPES.ILogger) private loggerService: ILogger,
        @inject(TYPES.UsersService) private UserService: IUserService,
    ) {
        super(loggerService);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new ValidateMiddleware(UsersRegisterDto)],
            },
            { path: '/login', method: 'post', func: this.login },
        ]);
    }

    login(req: Request<{}, {}, UsersLoginDto>, res: Response, next: NextFunction): void {
        next(new HTTPError(401, 'Вы не авторизованы', 'login service'));
    }

    async register(
        { body }: Request<{}, {}, UsersRegisterDto>,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        const result = await this.UserService.createUser(body);
        if (!result) {
            return next(new HTTPError(422, 'Такой пользователь уже существует'));
        }
        this.ok(res, { email: result.email });
    }
}
