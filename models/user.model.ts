import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface User {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

const UserSchema = new mongoose.Schema<User>({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
		maxLength: 100,
	},
	lastName: {
		type: String,
		required: true,
		maxLength: 100,
	},
});

UserSchema.pre("save", function (next) {
	const user = this;

	if (this.isModified("password") || this.isNew) {
		bcrypt.genSalt(10, function (saltError, salt) {
			if (saltError) {
				return next(saltError);
			}

			bcrypt.hash(user.password as string, salt, function (hashError, hash) {
				if (hashError) {
					return next(hashError);
				}

				user.password = hash;
				next();
			});
		});
		return;
	}

	return next();
});

export const User = mongoose.model("User", UserSchema);
