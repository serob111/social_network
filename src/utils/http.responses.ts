import { Response } from 'express';

export type FieldError = {
    field: string
    message: string
}

export const success = (
    res: Response,
    data?: any,
    message = 'Success',
    status = 200
) => {
    return res.status(status).json({
        ok: true,
        message,
        data,
    });
};

export const created = (
    res: Response,
    data?: any,
    message = 'Created'
) => {
    return res.status(201).json({
        ok: true,
        message,
        data,
    });
};

export const notFound = (
    res: Response,
    message = 'Not found'
) => {
    return res.status(404).json({
        ok: false,
        message,
    });
};

export const badRequest = (
    res: Response,
    message: string | string[] | FieldError[]
) => {
    return res.status(400).json({
        ok: false,
        message,
    });
};

export const unauthorized = (
    res: Response,
    message = 'Unauthorized'
) => {
    return res.status(401).json({
        ok: false,
        message,
    });
};

export const serverError = (
    res: Response,
    error?: any
) => {
    console.error(error);
    return res.status(500).json({
        ok: false,
        message: 'Internal server error',
    });
};
