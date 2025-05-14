import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loginRouter = express.Router();

loginRouter.use(
    "/public",
    express.static(path.join(__dirname, "../../public")),
);

loginRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../src", "views", "index.ejs"));
});

export default loginRouter;
