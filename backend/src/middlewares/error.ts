import { Request, Response, NextFunction } from 'express'

export interface CustomError extends Error {
    status?: number;
    message: string;
}

export function errorMiddleware(err: CustomError, req: Request, res: Response, next: NextFunction): void {
    const status = err.status || 500;
    const message = err.message || 'Помилка сервера';

    console.error(`[${req.method}] ${req.url} — ${status}: ${message}`);
    console.log(err)
    
    res.status(status).json({
        message
    });
}

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
    res.status(404).json({
        message: `Маршрут [${req.method}] ${req.originalUrl} не знайдено`
    });
}