import { Request, Response, NextFunction } from "express";
import * as logger from "./logger";

export const unknownEndpoint = (request: Request, response: Response): void => {
    response.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
): void => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message });
    } else {
        next(error);
    }
};
