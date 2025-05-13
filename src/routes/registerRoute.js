import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registerRouter = express.Router();

registerRouter.use(
	"/public",
	express.static(path.join(__dirname, "../../public")),
);

registerRouter.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../src", "views", "signup.ejs"));
});

export default registerRouter;
