import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import tokenService from "../services/token.service";
import userService from "../services/user.service";

export async function authenticateToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	const isBlackListed = await tokenService.isBlacklisted(token);

	if (isBlackListed) return res.sendStatus(403);

	jwt.verify(
		token,
		process.env.TOKEN_SECRET as string,
		async (err: any, tokenBody: any) => {
			if (err) {
				console.log(err);
				return res.sendStatus(403);
			}

			const dbUser = await userService.findByEmail(tokenBody.email);

			if (!dbUser) return res.sendStatus(403);

			req.user = dbUser;

			next();
		}
	);
}
