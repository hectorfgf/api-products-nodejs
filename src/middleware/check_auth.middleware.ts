import express from 'express';

class AuthCheckMiddleware {

    async validateToken(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const token = req.headers.authorization;
        if (token == 'Bearer admintoken'){
            next();
        }else {
            res.status(403).send({
                error: `You do not have the required authorization.`,
            });
        }
    }

}

export default new AuthCheckMiddleware();
