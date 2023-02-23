import mongoose from "mongoose";

export interface Token {
	token: string;
	blacklisted_at: string;
}

const BlacklistedTokenSchema = new mongoose.Schema<Token>({
	token: {
		type: String,
		required: true,
	},
	blacklisted_at: {
		type: String,
		required: true,
	},
});

export const BlacklistedToken = mongoose.model(
	"BlacklistedToken",
	BlacklistedTokenSchema
);
