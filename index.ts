import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRouter from "./routers/auth.router";
import { bootstrapDB } from "./models/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use("/auth", authRouter);

const start = async () => {
	try {
		await bootstrapDB();
		app.listen(port, () => {
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();
