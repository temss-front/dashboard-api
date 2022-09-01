import { Response, Router } from 'express';
import { IControllerRoute } from './types';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: ILogger) {
        this._router = Router();
    }

    get router(): Router {
        return this._router;
    }

    public created(res: Response): Response<any, Record<string, any>> {
        return res.sendStatus(201);
    }

    public send<T>(res: Response, code: number, msg: T): Response<any, Record<string, any>> {
        res.type('application/json');
        return res.status(code).json(msg);
    }

    public ok<T>(res: Response, msg: T): Response<any, Record<string, any>> {
        return this.send<T>(res, 200, msg);
    }
    protected bindRoutes(routes: IControllerRoute[]): void {
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            const middlewares = route.middlewares?.map((m) => m.execute.bind(m));
            const pipeline = middlewares ? [...middlewares, handler] : handler;
            this.router[route.method](route.path, pipeline);
        }
    }
}
