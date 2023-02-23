import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import tokenService from "./token.service";

export default {
	async register(
		email: string,
		password: string,
		firstName: string,
		lastName: string
	) {
		const user = new User({
			email,
			password,
			firstName,
			lastName,
		});

		await user.save();

		return user;
	},

	async findByEmail(email: string) {
		return User.findOne({ email: email });
	},

	async login(email: string, password: string) {
		const user = await this.findByEmail(email);

		if (!user) throw new Error("User not found!");

		const passwordIsValid = bcrypt.compareSync(password, user.password);
		if (!passwordIsValid) throw new Error("Wrong password!");

		const token = tokenService.generateAccessToken(user.email);
		return token;
	},
};
