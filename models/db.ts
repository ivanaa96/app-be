import mongoose from "mongoose";

export async function bootstrapDB() {
	await mongoose.connect(
		`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
		{
			dbName: "test",
			user: process.env.DB_USER,
			pass: process.env.DB_PASSWORD,
			autoCreate: true,
		}
	);
}
