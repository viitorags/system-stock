import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dashboardRouter = express.Router();

dashboardRouter.use(
	"/public",
	express.static(path.join(__dirname, "../../public")),
);

dashboardRouter.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../src", "views", "dashboard.ejs"));
});

export default dashboardRouter;
