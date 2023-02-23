import { Router, Request, Response } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { loginRequest, registrationRequest } from "../requests/user.request";
import { validateSchema } from "../middleware/validateSchema.middleware";
import userService from "../services/user.service";
import tokenService from "../services/token.service";

const authRouter = Router();

authRouter.post(
	"/login",
	loginRequest,
	validateSchema,
	async (req: Request, res: Response) => {
		try {
			const token = await userService.login(req.body.email, req.body.password);
			return res.json({ token });
		} catch (e) {
			res.status(400).json({ message: e });
		}
	}
);

authRouter.post(
	"/register",
	registrationRequest,
	validateSchema,
	async (req: Request, res: Response) => {
		const user = await userService.register(
			req.body.email,
			req.body.password,
			req.body.firstName,
			req.body.lastName
		);
		return res.json(user);
	}
);

authRouter.post(
	"/logout",
	authenticateToken,
	async (req: Request, res: Response) => {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1];

		if (!token) return res.status(400);

		await tokenService.blacklist(token);
		res.status(200).json({ status: "Logged out successfully!" });
	}
);

authRouter.get("/home", authenticateToken, (req: Request, res: Response) => {
	return res.json({
		firstName: req.user?.firstName,
		lastName: req.user?.lastName,
	});
});

export default authRouter;
