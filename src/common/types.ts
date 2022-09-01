import { NextFunction, Request, Response, Router } from 'express';

export interface IMiddleware {
    execute: (req: Request, res: Response, next: NextFunction) => void;
}

export interface IControllerRoute {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
    middlewares?: IMiddleware[];
}
