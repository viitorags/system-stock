import express from "express";
import expressSession from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import productController from "./src/controllers/productController.js";
import userController from "./src/controllers/userController.js";
import routes from "./src/routes/routes.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Sessão de usuário
app.use(expressSession({
	secret: 'segredo',
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,  // Mantenha falso para HTTP, use true para HTTPS
		maxAge: 1000 * 60 * 60 * 24  // 1 dia em milissegundos
	}
}));
app.set("trust proxy", 1);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views")); // ajuste o caminho se necessário

// Routes Website
routes(app);

// API Endpoints

app.get("/api/user", userController.getUserSession);
app.post("/api/login", userController.login, (req, res) => {
	req.session.userId = req.user.user_id;
	res.send('Usuário logado!');
});
app.get("/api/produtos", productController.getAllProducts);
app.post("/api/produtos", productController.createNewProduct);
app.delete("/api/produtos/:product_id", productController.deleteProduct);
app.post("/api/registerUser", userController.createNewUser);
app.listen(PORT, () => {
	console.log(`Server rodando em http://localhost:${PORT}`);
});
