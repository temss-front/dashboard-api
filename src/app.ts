import express, { Express } from 'express';
import { Server } from 'http';
import { UsersController } from './users/users.controller';
import { ExceptionFilter } from './errors/exeption.filter';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import bodyParser from 'body-parser';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UsersController) private userController: UsersController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/users', bodyParser.json(), this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`The server starts on http://localhost:${this.port}`);
	}
}
