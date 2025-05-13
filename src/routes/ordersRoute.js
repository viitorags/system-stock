import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ordersRouter = express.Router();

ordersRouter.use(
	"/public",
	express.static(path.join(__dirname, "../../public")),
);

ordersRouter.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../src", "views", "orders.ejs"));
});

export default ordersRouter;
