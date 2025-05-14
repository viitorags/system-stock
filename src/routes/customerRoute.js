import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const customerRouter = express.Router();

customerRouter.use(
    "/public",
    express.static(path.join(__dirname, "../../public")),
);

customerRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../src", "views", "customer.ejs"));
});

export default customerRouter;
