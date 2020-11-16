import { NextFunction, Request, Response } from "express";

export function paginateMiddleware(req: any, res: Partial<Response>, next: NextFunction): void {
    try {
        if (req.query?.limit === undefined) {
            req.query.limit = '10';
        } else {
            if (Number(req?.query.limit) <= 10) req.query.limit = '10';
        }
        next();
    } catch (err) {
        console.log(err);
        res.status?.(401).send({ code: 401, error: err.message });
    }
}