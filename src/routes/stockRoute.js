import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const stockRouter = express.Router();

// Servir arquivos estáticos da pasta public
stockRouter.use(
	"/public",
	express.static(path.join(__dirname, "../../public"))
);

// Rota da página de estoque usando EJS
stockRouter.get("/", async (req, res) => {
	console.log("Sessão recebida:", req.session);
	try {
		if (!req.session.user_id) {
			return res.redirect("/");
		}

		const userId = req.session.user_id;

		// Busca os produtos do usuário no banco
		const result = await db.query("SELECT * FROM products WHERE user_id = $1", [userId]);
		const produtos = result.rows;

		// Renderiza a view EJS com os produtos
		res.render("stock", { produtos });

	} catch (error) {
		console.error("Erro ao carregar estoque:", error);
		res.status(500).send("Erro ao carregar a página de estoque.");
	}
});

export default stockRouter;
