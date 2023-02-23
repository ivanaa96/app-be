import { BlacklistedToken } from "../models/blacklist-token.model";
import jwt from "jsonwebtoken";

export default {
	async blacklist(token: string) {
		const blacklistedToken = new BlacklistedToken({
			token,
			blacklisted_at: new Date().toISOString(),
		});

		await blacklistedToken.save();

		return blacklistedToken;
	},

	async isBlacklisted(token: string) {
		const blacklistedToken = await BlacklistedToken.findOne({
			token,
		});

		return !!blacklistedToken;
	},

	generateAccessToken(email: string) {
		return jwt.sign({ email }, process.env.TOKEN_SECRET as string, {
			expiresIn: "7d",
		});
	},
};
