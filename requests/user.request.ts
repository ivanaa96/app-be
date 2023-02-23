import { checkSchema } from "express-validator";
import userService from "../services/user.service";

export const registrationRequest = checkSchema({
	email: {
		isEmail: {
			errorMessage: "Email is a required field!",
		},
		custom: {
			options: async (value) => {
				const user = await userService.findByEmail(value);
				if (user) {
					return Promise.reject("E-mail is taken!");
				}
				return user;
			},
		},
	},
	password: {
		isLength: {
			errorMessage: "Password should be at least 6 characters!",
			options: { min: 6 },
		},
	},
	firstName: {
		isString: {
			errorMessage: "First name is required!",
		},
	},
	lastName: {
		isString: {
			errorMessage: "Last name is required!",
		},
	},
});

export const loginRequest = checkSchema({
	email: {
		isEmail: {
			errorMessage: "Email is a required field!",
		},
		custom: {
			options: async (value) => {
				const user = await userService.findByEmail(value);
				if (!user) {
					return Promise.reject("User with this email doesn't exist!");
				}
				return user;
			},
		},
	},
});
